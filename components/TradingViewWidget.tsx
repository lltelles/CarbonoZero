// TradingViewWidget.tsx
import React, { useEffect, useRef, memo } from "react";
import { WebView } from "react-native-webview";

const TradingViewWidget: React.FC = () => {
  const webviewRef = useRef<WebView>(null);

  const widgetHTML = `
    <html>
      <body>
        <div class="tradingview-widget-container">
          <div id="tradingview_widget"></div>
          <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"></script>
          <script type="text/javascript">
            new TradingView.widget({
              "autosize": true,
              "symbol": "AMEX:KRBN",  // Update to your desired ticker symbol
              "interval": "W",
              "timezone": "Etc/UTC",
              "theme": "dark",
              "style": "3",
              "locale": "br",
              "gridColor": "rgba(42, 46, 57, 0)",
              "allow_symbol_change": true,
              "calendar": false,
              "hide_volume": true,
              "support_host": "https://www.tradingview.com"
            });
          </script>
        </div>
      </body>
    </html>
  `;

  return (
    <WebView
      ref={webviewRef}
      originWhitelist={["*"]}
      source={{ html: widgetHTML }}
      style={{ height: "100%", width: "100%" }}
      cacheEnabled={false}
    />
  );
};

export default memo(TradingViewWidget);
