package com.mattermost.bundler;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class MattermostBundlerNativeModule extends ReactContextBaseJavaModule {

    private MattermostBundler mMattermostBundler;

    MattermostBundlerNativeModule(ReactApplicationContext reactContext, MattermostBundler bundler) {
        super(reactContext);
        mMattermostBundler = bundler;
    }

    @Override
    public String getName() {
        return "MattermostBundler";
    }
}
