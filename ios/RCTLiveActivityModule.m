#import "nativeModules-Bridging-Header.h"

// Define the LiveActivity module for React Native
@interface RCT_EXTERN_MODULE(LiveActivity, NSObject)

// Define the endActivity method, which ends a live activity given its ID
RCT_EXTERN_METHOD(endActivity:(NSString)id withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

// Define the listAllActivities method, which lists all currently active live activities
RCT_EXTERN_METHOD(listAllActivities:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

// Define the updateActivity method, which updates a live activity given its ID and new emoji state
RCT_EXTERN_METHOD(updateActivity:(NSString)id emoji:(NSString)emoji withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

  
@end

  
// Define the LiveActivitiModule for React Native, which extends RCTEventEmitter
@interface RCT_EXTERN_MODULE(LiveActivitiModule, RCTEventEmitter)

  
// Define the supportedEvents method, which lists the events that can be sent to JavaScript
RCT_EXTERN_METHOD(supportedEvents)

  

@end
