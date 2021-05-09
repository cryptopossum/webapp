export const googleTagManager = (id: string, name: string | null) => {
  if (window.dataLayer) return;
  if (id && name)
    window.dataLayer = [
      {
        wallet: {
          id: id,
          name: name
        }
      }
    ];
  init(window, document, "script", "dataLayer", "GTM-TCBKR7W");
  sendGTMPath(undefined, window.location.pathname);
};

const init = (w: any, d: any, s: any, l: any, i: any) => {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
};

const sendGTM = (data: {}) => {
  const dataLayer = window.dataLayer as {}[];
  if (dataLayer) dataLayer.push(data);
};

export const sendConversionEvent = (
  event: string,
  event_properties: {} | undefined = undefined
) => {
  sendGTM({
    event: "CE " + event,
    event_properties: event_properties,
    user_properties: undefined,
    ga_event: {
      category: "Conversion"
    }
  });
};

export const sendWalletEvent = (
  event: string,
  event_properties: {} | undefined = undefined,
  id: string = "",
  name: string = ""
) => {
  const wallet = "Wallet";
  if (id && name)
    sendGTM({
      event: "CE " + event,
      ga_event: {
        category: wallet
      },
      user_properties: {
        wallet_id: id,
        wallet_name: name
      },
      wallet: {
        id,
        name
      }
    });
  else
    sendGTM({
      event: "CE " + event,
      event_properties: event_properties,
      user_properties: undefined,
      ga_event: {
        category: wallet
      }
    });
};

export const sendGTMPath = (
  from: string | undefined,
  to: string,
  darkMode: boolean = false
) =>
  sendGTM({
    event: "VP " + to,
    page: {
      from_path: from,
      to_path: to,
      theme: darkMode ? "Dark" : "Light"
    },
    user_properties: undefined,
    ga_event: undefined
  });
