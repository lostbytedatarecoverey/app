# LOSTBYTE — Google Forms Lead Collection Reference

## Primary Active Architecture (Zero Environment Variables Required)

The LOSTBYTE website submits enquiries **directly to your existing Google Form `/formResponse` endpoint** using a hidden `<iframe>` POST request inside `src/components/EnquiryForm.tsx`.

- **No environment variables are required** to run locally, in Google AI Studio preview, or in production (`https://lostbyte.in`).
- Customers never leave `lostbyte.in` and never see the default Google Forms UI or redirect screen.
- All 6 customer-entered fields are dynamically mapped to the exact verified entry IDs from your prefilled URL:
  - `entry.174290505` -> Full Name
  - `entry.358460709` -> Mobile Number
  - `entry.450074997` -> Email Address
  - `entry.1721769737` -> Storage Device Type
  - `entry.870729571` -> Storage Capacity
  - `entry.1685007087` -> Pickup / Contact Address
- **Endpoint**: `https://docs.google.com/forms/d/e/1FAIpQLSerYlDcnBEO5i7QliyoGXvj4UyxiTualsSAzhxmM7aret4sQA/formResponse`

> **Important Note on Google Form Question Types**:
> Ensure your Drive Type and Storage Capacity questions in Google Forms accept the dropdown values configured in `src/config/siteConfig.ts` (Short Answer questions accept every option seamlessly without option-text mismatch errors).

## Optional Apps Script Bridge (`Code.gs`)

`google-apps-script/Code.gs` is included as an optional server-side relay reference if you ever wish to add server-side Apps Script logging in the future. It is **not required** for the website or Google Forms lead collection to operate.
