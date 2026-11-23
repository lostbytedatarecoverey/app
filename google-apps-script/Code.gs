/**
 * LOSTBYTE — Google Apps Script Web App Bridge
 * ==============================================================
 * Connects the custom LOSTBYTE website enquiry form directly to the
 * existing LOSTBYTE Google Form without redirecting customers away
 * from https://lostbyte.in.
 *
 * ARCHITECTURE:
 *   LOSTBYTE Custom Form (hidden iframe POST)
 *     -> Google Apps Script Web App (doPost)
 *       -> Server-side validation & submissionId deduplication
 *       -> UrlFetchApp POST to Google Forms formResponse endpoint
 *     -> Returns controlled HTML page sending window.parent.postMessage(...)
 *
 * DEPLOYMENT SETTINGS:
 *   - Execute as: Me (form owner Google account)
 *   - Who has access: Anyone
 *   - Copy the deployed Web App URL (.../exec) into VITE_GOOGLE_APPS_SCRIPT_URL
 */

var GOOGLE_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSerYlDcnBEO5i7QliyoGXvj4UyxiTualsSAzhxmM7aret4sQA/formResponse';

/**
 * Explicit allowed origins that may receive postMessage confirmation.
 * Update or add preview domains only if needed during staging tests.
 */
var ALLOWED_ORIGINS = [
  'https://lostbyte.in',
  'https://www.lostbyte.in',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

/**
 * Exact Google Form field entry IDs.
 */
var ENTRY_IDS = {
  customerName: 'entry.174290505',
  contactNumber: 'entry.358460709',
  emailAddress: 'entry.450074997',
  driveType: 'entry.1721769737',
  storageCapacity: 'entry.870729571',
  address: 'entry.1685007087'
};

/**
 * Handles POST requests submitted via hidden iframe from the LOSTBYTE website.
 */
function doPost(e) {
  var params = (e && e.parameter) ? e.parameter : {};
  var submissionId = sanitize_(params.submissionId, 80);
  var requestedOrigin = sanitize_(params.clientOrigin, 200);
  var targetOrigin = resolveAllowedOrigin_(requestedOrigin);

  try {
    // 1. Validate required fields server-side
    var customerName = sanitize_(params[ENTRY_IDS.customerName], 120);
    var contactNumber = sanitize_(params[ENTRY_IDS.contactNumber], 40);
    var emailAddress = sanitize_(params[ENTRY_IDS.emailAddress], 160);
    var driveType = sanitize_(params[ENTRY_IDS.driveType], 100);
    var storageCapacity = sanitize_(params[ENTRY_IDS.storageCapacity], 60);
    var address = sanitize_(params[ENTRY_IDS.address], 500);

    if (!customerName || customerName.length < 2) {
      return buildBridgeHtmlResponse_(targetOrigin, submissionId, false, 'Please provide your full name.');
    }
    var digitsOnly = contactNumber.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return buildBridgeHtmlResponse_(targetOrigin, submissionId, false, 'Please provide a valid mobile number.');
    }
    if (!emailAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      return buildBridgeHtmlResponse_(targetOrigin, submissionId, false, 'Please provide a valid email address.');
    }
    if (!driveType) {
      return buildBridgeHtmlResponse_(targetOrigin, submissionId, false, 'Please select a storage device type.');
    }
    if (!storageCapacity) {
      return buildBridgeHtmlResponse_(targetOrigin, submissionId, false, 'Please select the storage capacity.');
    }
    if (!address || address.length < 5) {
      return buildBridgeHtmlResponse_(targetOrigin, submissionId, false, 'Please provide your pickup or contact address.');
    }

    // 2. Duplicate submission protection using ScriptCache (10-minute TTL)
    if (submissionId) {
      var cache = CacheService.getScriptCache();
      var cacheKey = 'lb_sub_' + submissionId;
      if (cache.get(cacheKey)) {
        return buildBridgeHtmlResponse_(
          targetOrigin,
          submissionId,
          true,
          'Enquiry already recorded.'
        );
      }
      cache.put(cacheKey, 'processing', 600);
    }

    // 3. Build exact form-urlencoded payload mapped to Google Form entry IDs
    var payload = {};
    payload[ENTRY_IDS.customerName] = customerName;
    payload[ENTRY_IDS.contactNumber] = contactNumber;
    payload[ENTRY_IDS.emailAddress] = emailAddress;
    payload[ENTRY_IDS.driveType] = driveType;
    payload[ENTRY_IDS.storageCapacity] = storageCapacity;
    payload[ENTRY_IDS.address] = address;

    // 4. Forward server-side to Google Forms formResponse endpoint
    var response = UrlFetchApp.fetch(GOOGLE_FORM_RESPONSE_URL, {
      method: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      payload: payload,
      muteHttpExceptions: true,
      followRedirects: true
    });

    var statusCode = response.getResponseCode();
    var bodyText = response.getContentText() || '';

    // Google Forms returns 200 OK on accepted submission; 400 on field validation mismatch
    var formAccepted =
      statusCode >= 200 &&
      statusCode < 300 &&
      bodyText.indexOf('freebirdFormviewerViewResponseConfirmationMessage') !== -1 ||
      (statusCode === 200 && bodyText.indexOf('v1/forms') === -1 && bodyText.indexOf('Your response has been recorded') !== -1) ||
      statusCode === 200;

    if (!formAccepted || statusCode >= 400) {
      if (submissionId) {
        CacheService.getScriptCache().remove('lb_sub_' + submissionId);
      }
      return buildBridgeHtmlResponse_(
        targetOrigin,
        submissionId,
        false,
        'Google Form validation rejected the submission (HTTP ' + statusCode + '). Please verify field values or call +91 63885 07400.'
      );
    }

    return buildBridgeHtmlResponse_(
      targetOrigin,
      submissionId,
      true,
      'Your data recovery enquiry has been submitted successfully.'
    );
  } catch (err) {
    if (submissionId) {
      try {
        CacheService.getScriptCache().remove('lb_sub_' + submissionId);
      } catch (ignore) {}
    }
    return buildBridgeHtmlResponse_(
      targetOrigin,
      submissionId,
      false,
      'Temporary submission error. Please retry or contact +91 63885 07400.'
    );
  }
}

/**
 * Simple health-check endpoint for verifying Web App deployment in a browser.
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ service: 'LOSTBYTE Enquiry Bridge', status: 'active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sanitize_(val, maxLen) {
  if (val === null || val === undefined) return '';
  return String(val).trim().slice(0, maxLen);
}

function resolveAllowedOrigin_(requestedOrigin) {
  for (var i = 0; i < ALLOWED_ORIGINS.length; i++) {
    if (ALLOWED_ORIGINS[i] === requestedOrigin) {
      return requestedOrigin;
    }
  }
  // Allow HTTPS run.app staging previews if explicitly testing from AI Studio preview URL
  if (/^https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.run\.app$/i.test(requestedOrigin)) {
    return requestedOrigin;
  }
  // Default strictly to primary production domain
  return 'https://lostbyte.in';
}

function buildBridgeHtmlResponse_(targetOrigin, submissionId, ok, message) {
  var resultPayload = JSON.stringify({
    type: 'LOSTBYTE_FORM_RESULT',
    submissionId: submissionId || '',
    ok: Boolean(ok),
    message: String(message || '')
  });

  var html =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>LOSTBYTE Form Bridge</title></head><body>' +
    '<script>' +
    '(function(){' +
    '  var payload = ' + resultPayload + ';' +
    '  var origin = ' + JSON.stringify(targetOrigin) + ';' +
    '  if (window.parent && window.parent !== window) {' +
    '    window.parent.postMessage(payload, origin);' +
    '  }' +
    '})();' +
    '</script>' +
    '</body></html>';

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
