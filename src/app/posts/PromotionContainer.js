import { useSelector } from "react-redux";
import AdSenseComponent from "./AdsenComponent";

const PromotionContainer = () => {
  const { settings_data } = useSelector((state) => state.minecraft_settings);

  return (
    settings_data?.settings?.promotion  ||  (settings_data?.settings?.adsense_pubid && settings_data?.settings?.adsense_slotid)
    ?
    <>
   <div className="promotion-box-con-news">
      <div className="promotion-box-activity-info">
        {(settings_data?.settings?.adsense_pubid && settings_data?.settings?.adsense_slotid) ? (
          <AdSenseComponent
          className="promotion-box-image"
          pubId={settings_data?.settings?.adsense_pubid}
          slotId={settings_data?.settings?.adsense_slotid}
          width={728}
          height={90}
        />
        ) : (
          <div 
          style={{
            wordBreak: "break-word", // Added property
            overflowWrap: "break-word", // Added property
          }}
          dangerouslySetInnerHTML={{ __html: settings_data?.settings?.promotion }} />
        )}
      </div>
    </div>
    </>
    :null
  );
};

export default PromotionContainer;
