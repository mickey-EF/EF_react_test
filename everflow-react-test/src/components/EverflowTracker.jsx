import { useEffect } from "react";

export default function EverflowTracker() {
  useEffect(() => {

    // Check if EF JS SDK already exists in page
    let script = document.querySelector('script[src*="clik2trk.com"]'); // Advertiser tracking domain

    if (!script) {
      // If EF JS SDK doesn't exist on page, add EF JS SDK to the page
      script = document.createElement("script");
      script.src = "https://www.clik2trk.com/scripts/main.js"; // Advertiser tracking domain
      script.type = "text/javascript";
      document.head.appendChild(script);
    }

    // If EF JS SDK exists, calls function runEverflowTracking
    if (window.EF) {
      runEverflowTracking();
    } else {
    // Waits for script to load to calls function runEverflowTracking
      script.onload = runEverflowTracking;
    }

    // EF to EF direct linking click scripts. 
    function runEverflowTracking() {
      const { EF } = window;
      if (!EF) return;

      if (EF.urlParameter("affid2")) {
        EF.click({
          tracking_domain: "https://www.click5trk.com", // Partner tracking domain
          offer_id: EF.urlParameter("oid2"),
          affiliate_id: EF.urlParameter("affid2"),
          sub1: EF.urlParameter("sub1"),
          sub2: EF.urlParameter("sub2"),
          sub3: EF.urlParameter("sub3"),
          sub4: EF.urlParameter("sub4"),
          sub5: EF.urlParameter("sub5"),
        }).then(function (transaction_id) {
          EF.click({
            tracking_domain: "https://www.clik2trk.com", // Advertiser tracking domain
            offer_id: EF.urlParameter("oid"),
            affiliate_id: EF.urlParameter("affid"),
            sub1: EF.urlParameter("sub1"),
            sub2: EF.urlParameter("sub2"),
            sub3: EF.urlParameter("sub3"),
            sub4: EF.urlParameter("sub4"),
            sub5: transaction_id, // Pass TID generated for the partner, to the advertiser
            uid: EF.urlParameter("uid"),
            source_id: EF.urlParameter("source_id"),
          });
        });
      } else {
        EF.click({
          tracking_domain: "https://www.clik2trk.com", // Advertiser tracking domain
          offer_id: EF.urlParameter("oid"),
          affiliate_id: EF.urlParameter("affid"),
          sub1: EF.urlParameter("sub1"),
          sub2: EF.urlParameter("sub2"),
          sub3: EF.urlParameter("sub3"),
          sub4: EF.urlParameter("sub4"),
          sub5: EF.urlParameter("sub5"),
          uid: EF.urlParameter("uid"),
          source_id: EF.urlParameter("source_id"),
          transaction_id: EF.urlParameter("_ef_transaction_id"),
        });
      }
    }
  }, []);
  return null;
}
