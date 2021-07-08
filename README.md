# How to Build
## common
1. [Homebrew](https://brew.sh/) 설치
2. yarn 설치

    ```
    $ brew install yarn
    ```

3. react-native-cli 설치

   ```
   $ yarn global add react-native-cli
   ```

4. React Native 패키지 설치

    ```
    $ yarn install
    ```
    
## for Android

1. [Android Studio](https://developer.android.com/studio) 설치
2. [JDK15 설치](https://github.com/AdoptOpenJDK/homebrew-openjdk)

    ```
    $ brew tap AdoptOpenJDK/openjdk
    $ brew install --cask adoptopenjdk15
    ```
    
3. 사용 중인 쉘의 환경 파일(.bashrc, .bash_profile, 또는 .zshrc)에 Android 관련 툴 실행 경로 추가

    ```
    export ANDROID_SDK_ROOT="/Users/username/Library/Android/sdk"
    export PATH="$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/tools:$PATH"
    ```

4. Android 10.0 (Q) / Level 29 설치 SDK 설치. 안드로이드 스튜디오를 실행하여 아래 메뉴로 들어가서 설치.

   ```
   Android Studio > Preferences... > Appearance & Behavior > System Settings > Android SDK
   ```

5. 빌드

   ```
   $ yarn install && yarn android
   ```  
   
6. 작업하는 디렉토리에서 실행

   ```
   $ react-native run-android
   ```  
   
## for IOS

1. [Xcode](https://itunes.apple.com/kr/app/xcode/id497799835?mt=12) 설치 (12.3.0 이상 )
2. Xcode 설치 혹은 업데이트 시, Xcode를 실행하여 추가 컴포넌트를 설치한다 (실행 시, 팝업 뜸)
3. Xcode 명령행 도구(Command Line Tools) 설치가 필요할 경우,

    ```
    $ xcode-select --install
    ```

4. 터미널에서 xcode-select로 사용한 Xcode 지정

    ```
    $ sudo xcode-select /Applications/Xcode.app
    ```

5. 빌드

    ```
    $ yarn install && yarn ios
    ```   
    
6. 작업하는 디렉토리에서 실행

   ```
   $ react-native run-ios
   ```  
   
# 발견된 오류
- [x] iPhone 작은 화면에서 피커와 시작 버튼 겹침

- [x] 나왔던 이미지가 다시 나오는 경우가 있음

- [x] 이미지의 fade-in/out 시, 흰 화면 나오지 않도록 처리 (이전 이미지는 fade-out / 새로운 이미지는 fade-in이 동시에 처리되어 이미지가 자연스럽게 바뀌도록)

- [x] 안드로이드에서 설정한 시간 표시 안됨

- [x] 안드로이드에서 이미지가 바뀔 때 깜빡 거리는 오류

- [x] 슬라이드 첫 실행 시 로드되는데 시간이 걸리는 오류
