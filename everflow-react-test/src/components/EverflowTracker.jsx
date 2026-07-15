import { useEffect } from 'react';

export default function EverflowTracker({ targetDomain, advertiserId, onLog }) {
  useEffect(() => {
    const { EF } = window;

    // Helper to log both to the console and to our on-screen test panel
    const logStatus = (message) => {
      console.log(message);
      if (onLog) onLog(message);
    };

    if (!EF) {
      logStatus("❌ Everflow SDK script tag not found in index.html");
      return;
    }

    const elems = document.getElementsByTagName("a");

    const appendTidToLinks = (tid) => {
      let updatedCount = 0;
      for (let i = 0; i < elems.length; i++) {
        if (elems[i].href.includes(targetDomain)) {
          try {
            const url = new URL(elems[i].href);
            url.searchParams.set("_ef_transaction_id", tid);
            elems[i].href = url.href;
            updatedCount++;
          } catch (e) {
            console.error("Error formatting URL:", elems[i].href, e);
          }
        }
      }
      logStatus(`🔗 Links updated! Appended TID to ${updatedCount} links matching "${targetDomain}".`);
    };

    const oid = EF.urlParameter("oid");
    const affid = EF.urlParameter("affid");
    const incomingTid = EF.urlParameter("_ef_transaction_id");
    const existingTid = EF.getAdvertiserTransactionId(advertiserId);

    // LAST-TOUCH GATEKEEPER LOGIC
    if (incomingTid) {
      logStatus(`⚡ Redirect TID found in URL: ${incomingTid}. Forwarding...`);
      appendTidToLinks(incomingTid);
    } 
    else if (existingTid && !affid) {
      logStatus(`♻️ Organic/Returning user. Reusing existing session TID: ${existingTid}`);
      appendTidToLinks(existingTid);
    } 
    else if (oid && affid) {
      logStatus(`⏳ New partner link (affid: ${affid}). Registering click with Everflow...`);
      
      EF.click({
        offer_id: oid,
        affiliate_id: affid,
        source_id: EF.urlParameter("source_id"),
        sub1: EF.urlParameter("sub1"),
        sub2: EF.urlParameter("sub2"),
        sub3: EF.urlParameter("sub3"),
        sub4: EF.urlParameter("sub4"),
        sub5: EF.urlParameter("sub5"),
        uid: EF.urlParameter("uid"),
        transaction_id: incomingTid,
      }).then((generatedTid) => {
        if (generatedTid) {
          logStatus(`✅ Click registered! Generated TID: ${generatedTid}`);
          appendTidToLinks(generatedTid);
        } else {
          logStatus(`⚠️ Click fired, but Everflow didn't return a TID. Check offer setup!`);
        }
      });
    } else {
      logStatus(`❌ No tracking parameters found. Try appending: ?oid=123&affid=456`);
    }
  }, [targetDomain, advertiserId, onLog]);

  return null; 
}