"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalWidget() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "discovery" });
      cal("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view",
        theme: "auto"
      });
    })();
  }, []);

  return (
    <div className="w-full min-h-[700px] relative overflow-hidden rounded-2xl bg-card border border-border/50">
      <Cal 
        namespace="discovery"
        calLink="nathankhane/discovery"
        style={{
          width: "100%",
          height: "700px",
          overflow: "scroll",
          borderRadius: "16px"
        }}
        config={{
          layout: "month_view",
          theme: "auto"
        }}
      />
    </div>
  );
}