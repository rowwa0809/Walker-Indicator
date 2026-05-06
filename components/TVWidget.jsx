"use client";

import { useEffect, useRef } from "react";

const SCRIPT_BASE = "https://s3.tradingview.com/external-embedding/";

// Each widget pairs a TradingView embed script with its sane default config.
// Pass `config` to override or extend the defaults.
const WIDGETS = {
  ticker: {
    src: SCRIPT_BASE + "embed-widget-ticker-tape.js",
    defaults: {
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
        { proName: "FOREXCOM:DJI", title: "Dow 30" },
        { proName: "TVC:VIX", title: "VIX" },
        { proName: "TVC:US10Y", title: "US 10Y" },
        { proName: "TVC:DXY", title: "Dollar Index" },
        { proName: "TVC:GOLD", title: "Gold" },
        { proName: "NYMEX:CL1!", title: "Crude Oil" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en"
    }
  },
  advancedChart: {
    src: SCRIPT_BASE + "embed-widget-advanced-chart.js",
    defaults: {
      autosize: true,
      symbol: "SPY",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      withdateranges: true,
      hide_side_toolbar: false,
      details: true,
      hotlist: false,
      calendar: false
    }
  },
  miniChart: {
    src: SCRIPT_BASE + "embed-widget-mini-symbol-overview.js",
    defaults: {
      symbol: "SPY",
      width: "100%",
      height: 220,
      locale: "en",
      dateRange: "12M",
      colorTheme: "dark",
      isTransparent: true,
      autosize: false,
      largeChartUrl: "",
      trendLineColor: "rgba(34, 197, 94, 1)",
      underLineColor: "rgba(34, 197, 94, 0.15)",
      underLineBottomColor: "rgba(34, 197, 94, 0)"
    }
  },
  symbolOverview: {
    src: SCRIPT_BASE + "embed-widget-symbol-overview.js",
    defaults: {
      symbols: [["SPY", "SPY|12M"]],
      chartOnly: false,
      width: "100%",
      height: "100%",
      locale: "en",
      colorTheme: "dark",
      autosize: true,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "10",
      noTimeScale: false,
      valuesTracking: "1",
      changeMode: "price-and-percent",
      chartType: "area",
      lineColor: "rgba(34, 197, 94, 1)",
      topColor: "rgba(34, 197, 94, 0.32)",
      bottomColor: "rgba(34, 197, 94, 0)",
      isTransparent: true
    }
  },
  economicCalendar: {
    src: SCRIPT_BASE + "embed-widget-events.js",
    defaults: {
      width: "100%",
      height: "100%",
      colorTheme: "dark",
      isTransparent: true,
      locale: "en",
      importanceFilter: "0,1",
      countryFilter: "us,eu,gb,jp,cn"
    }
  },
  marketOverview: {
    src: SCRIPT_BASE + "embed-widget-market-overview.js",
    defaults: {
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      width: "100%",
      height: "100%",
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      plotLineColorGrowing: "rgba(34, 197, 94, 1)",
      plotLineColorFalling: "rgba(239, 68, 68, 1)",
      gridLineColor: "rgba(148, 163, 184, 0.1)",
      scaleFontColor: "rgba(148, 163, 184, 0.8)",
      belowLineFillColorGrowing: "rgba(34, 197, 94, 0.15)",
      belowLineFillColorFalling: "rgba(239, 68, 68, 0.15)",
      symbolActiveColor: "rgba(34, 197, 94, 0.18)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
            { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
            { s: "FOREXCOM:DJI", d: "Dow 30" },
            { s: "TVC:VIX", d: "VIX" },
            { s: "INDEX:RUI", d: "Russell 1000" }
          ]
        },
        {
          title: "Bonds",
          symbols: [
            { s: "TVC:US02Y", d: "US 2Y" },
            { s: "TVC:US10Y", d: "US 10Y" },
            { s: "TVC:US30Y", d: "US 30Y" },
            { s: "TVC:DE10Y", d: "Germany 10Y" }
          ]
        },
        {
          title: "FX",
          symbols: [
            { s: "TVC:DXY", d: "Dollar Index" },
            { s: "FX:EURUSD", d: "EUR/USD" },
            { s: "FX:USDJPY", d: "USD/JPY" },
            { s: "FX:GBPUSD", d: "GBP/USD" }
          ]
        }
      ]
    }
  },
  forexHeatmap: {
    src: SCRIPT_BASE + "embed-widget-forex-heat-map.js",
    defaults: {
      width: "100%",
      height: "100%",
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"],
      isTransparent: true,
      colorTheme: "dark",
      locale: "en"
    }
  },
  forexCrossRates: {
    src: SCRIPT_BASE + "embed-widget-forex-cross-rates.js",
    defaults: {
      width: "100%",
      height: "100%",
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
      isTransparent: true,
      colorTheme: "dark",
      locale: "en"
    }
  },
  stockHeatmap: {
    src: SCRIPT_BASE + "embed-widget-stock-heatmap.js",
    defaults: {
      exchanges: [],
      dataSource: "SPX500",
      grouping: "sector",
      blockSize: "market_cap_basic",
      blockColor: "change",
      locale: "en",
      symbolUrl: "",
      colorTheme: "dark",
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      isTransparent: true,
      width: "100%",
      height: "100%"
    }
  },
  cryptoHeatmap: {
    src: SCRIPT_BASE + "embed-widget-crypto-coins-heatmap.js",
    defaults: {
      dataSource: "Crypto",
      blockSize: "market_cap_calc",
      blockColor: "24h_close_change|5",
      locale: "en",
      symbolUrl: "",
      colorTheme: "dark",
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      isTransparent: true,
      width: "100%",
      height: "100%"
    }
  },
  technicalAnalysis: {
    src: SCRIPT_BASE + "embed-widget-technical-analysis.js",
    defaults: {
      interval: "1D",
      width: "100%",
      isTransparent: true,
      height: "100%",
      symbol: "SPY",
      showIntervalTabs: true,
      displayMode: "single",
      locale: "en",
      colorTheme: "dark"
    }
  },
  symbolInfo: {
    src: SCRIPT_BASE + "embed-widget-symbol-info.js",
    defaults: {
      symbol: "SPY",
      colorTheme: "dark",
      isTransparent: true,
      locale: "en",
      width: "100%"
    }
  },
  topStories: {
    src: SCRIPT_BASE + "embed-widget-timeline.js",
    defaults: {
      feedMode: "all_symbols",
      isTransparent: true,
      displayMode: "regular",
      width: "100%",
      height: "100%",
      colorTheme: "dark",
      locale: "en"
    }
  },
  screener: {
    src: SCRIPT_BASE + "embed-widget-screener.js",
    defaults: {
      width: "100%",
      height: "100%",
      defaultColumn: "overview",
      defaultScreen: "general",
      market: "us",
      showToolbar: true,
      colorTheme: "dark",
      locale: "en",
      isTransparent: true
    }
  }
};

export default function TVWidget({ type, config = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const widget = WIDGETS[type];
    const host = ref.current;
    if (!widget || !host) return;

    host.innerHTML = "";
    const container = document.createElement("div");
    container.className = "tradingview-widget-container__widget";
    host.appendChild(container);

    const script = document.createElement("script");
    script.src = widget.src;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({ ...widget.defaults, ...config });
    host.appendChild(script);

    return () => {
      if (host) host.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, JSON.stringify(config)]);

  return <div className="tradingview-widget-container" ref={ref} />;
}
