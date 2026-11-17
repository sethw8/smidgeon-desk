// Where Desk replies go (moved off Netlify, 16 Nov 2026): Seth's Google Apps
// Script web app, which adds each reply as a row in his "Smidgeon Desk replies"
// sheet. Sent as plain text so the browser needs no preflight; Apps Script
// answers with JSON. scripts/publish-desk.sh fills in the address from
// tools/desk-apps-script/endpoint.txt.
const DESK_REPLY_URL = "https://script.google.com/macros/s/AKfycbxnlOKSllHJenBAixtF6QSfkmFsg40hCVXYtr1AGH7Vyn9zt2mTblXIwXP_CwJKknYODg/exec";

async function sendDeskReply(fields) {
  if (!DESK_REPLY_URL) throw new Error("not connected");
  const r = await fetch(DESK_REPLY_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...fields, page: location.pathname.split("/").pop() || "index.html" }) });
  if (!r.ok) throw new Error(r.status);
  const j = await r.json().catch(() => ({}));
  if (!j.ok) throw new Error(j.error || "not saved");
}
