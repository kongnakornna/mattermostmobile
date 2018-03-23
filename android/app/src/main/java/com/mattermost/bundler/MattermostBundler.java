package com.mattermost.bundler;

import android.content.Context;
import android.util.Log;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.uimanager.ViewManager;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MattermostBundler implements ReactPackage {

    private Context mContext;

    private String mFilesDirectory;

    private static MattermostBundler mCurrentInstance;

    public MattermostBundler(Context context) {
        mContext = context.getApplicationContext();
        mFilesDirectory = mContext.getFilesDir().getAbsolutePath();
        mCurrentInstance = this;
    }

    public static String getJSBundleFile() {
        if (mCurrentInstance == null) {
            throw new RuntimeException("MattermostBundler has not been initialized.");
        }

        return mCurrentInstance.getJSBundleFileInternal();
    }

    public String getJSBundleFileInternal() {
        Log.d("ReactNative", "[MattermostBundler] Starting bundling");

        String baseBundle = "";
        try {
            baseBundle = FileUtils.getStringFromInputStream(mContext.getAssets().open("index.android.bundle"));
        } catch (IOException e) {
            Log.d("ReactNative", "[MattermostBundler] Failed to open base bundle, err=" + e.getMessage());
            return "assets://index.android.bundle";
        }

        String pluginBundle = "";
        try {
            pluginBundle = FileUtils.getStringFromInputStream(mContext.getAssets().open("rntest.bundle"));
        } catch (IOException e) {
            Log.d("ReactNative", "[MattermostBundler] Failed to open plugin bundle, err=" + e.getMessage());
            return "assets://index.android.bundle";
        }

        pluginBundle = pluginBundle.replaceAll("%replace1%", "1904");
        pluginBundle = pluginBundle.replaceAll("%replace2%", "1905");

        baseBundle += "\n";
        baseBundle += pluginBundle;
        baseBundle += "\nrequire(1904);";

        String combinedBundlePath = mFilesDirectory + "/combined.bundle";

        try {
            FileUtils.writeStringToFile(baseBundle, combinedBundlePath);
        } catch (IOException e) {
            Log.d("ReactNative", "[MattermostBundler] Failed to write combined bundle, err=" + e.getMessage());
            return "assets://index.android.bundle";
        }

        Log.d("ReactNative", "[MattermostBundler] Completed bundling to " + combinedBundlePath);
        return combinedBundlePath;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        MattermostBundlerNativeModule bundlerModule = new MattermostBundlerNativeModule(reactApplicationContext, this);

        List<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(bundlerModule);
        return nativeModules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        return new ArrayList<>();
    }
}
