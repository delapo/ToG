#react-native-toast-android
toast android module for react native from ganxunzou

install
```
npm install react-native-toast-android --save
```


#Manually
 - android/settings.gradle
 ```
 include ':react-native-toast-android'
 project(':react-native-toast-android').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-toast-android')
 ```

 - android/app/build.gradle
 ```
 dependencies {
     compile project(':react-native-toast-android')
 }
 ```

 - register module (in MainActivity.java)
 ```
 import com.example.reactnativetoast.ToastModulePackage; // <--- IMPORT

 public class MainActivity extends ReactActivity {

     ...

     @Override
     protected List<ReactPackage> getPackages() {
         return Arrays.<ReactPackage>asList(
             new MainReactPackage(),
             new ToastModulePackage() // <--- ADD HERE
         );
     }
 }
 ```

#General Usage
```
import Alipay from 'react-native-toast-android';
ToastAndroid.show('Awesome', ToastAndroid.SHORT);
```