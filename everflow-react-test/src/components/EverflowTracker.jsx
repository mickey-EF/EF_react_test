import { useEffect } from 'react';

export default function EverflowTracker() {
  useEffect(() => {
    const { EF } = window;

  if (EF.urlParameter("affid2")) {
    EF.click({
      tracking_domain: "https://www.click5trk.com",
      offer_id: EF.urlParameter("oid2"),
      affiliate_id: EF.urlParameter("affid2"),
      sub1: EF.urlParameter("sub1"),
      sub2: EF.urlParameter("sub2"),
      sub3: EF.urlParameter("sub3"),
      sub4: EF.urlParameter("sub4"),
      sub5: EF.urlParameter("sub5"),
    }).then(function (transaction_id) {
      EF.click({
        tracking_domain: "https://www.clik2trk.com",
        offer_id: EF.urlParameter("oid"),
        affiliate_id: EF.urlParameter("affid"),
        sub1: EF.urlParameter("sub1"),
        sub2: EF.urlParameter("sub2"),
        sub3: EF.urlParameter("sub3"),
        sub4: EF.urlParameter("sub4"),
        sub5: transaction_id,
        uid: EF.urlParameter("uid"),
        source_id: EF.urlParameter("source_id"),
      });
    });
  } else {
    EF.click({
      tracking_domain: "https://www.clik2trk.com",
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
    
  },);

  return null; 
}