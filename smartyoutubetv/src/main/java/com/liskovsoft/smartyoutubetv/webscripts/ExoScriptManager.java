package com.liskovsoft.smartyoutubetv.webscripts;

import android.content.Context;
import com.liskovsoft.smartyoutubetv.common.helpers.Helpers;

import java.io.InputStream;
import java.util.List;

public class ExoScriptManager implements ScriptManager {
    private final Context mContext;
    private List<String> mOnLoadScripts;
    private List<String> mStyles;

    public ExoScriptManager(Context context) {
        mContext = context;

        if (mContext instanceof com.liskovsoft.smartyoutubetv.flavors.exoplayer.SmartYouTubeTVExoBase) {
            mOnLoadScripts = Helpers.getAssetJSFiles(context, CORE_EXO_DIR);
            mStyles = Helpers.getAssetCSSFiles(context, CORE_EXO_DIR);
        }
    }

    @Override
    public InputStream getOnInitScripts() {
        return null;
    }

    @Override
    public InputStream getOnLoadScripts() {
        return Helpers.getAssetMerged(mContext, mOnLoadScripts);
    }

    @Override
    public InputStream getStyles() {
        return Helpers.getAssetMerged(mContext, mStyles);
    }
}
