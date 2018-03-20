#import "PurebredManager.h"
#import <React/RCTLog.h>

@implementation PurebredManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(launch:(NSString *)name)
{
  RCTLogInfo(@"preparing to launch purebred %@", name);
  dispatch_async(dispatch_get_main_queue(), ^{
    UIStoryboard *sb = [UIStoryboard storyboardWithName:@"Purebred" bundle:nil];
    UIViewController *vc = [sb instantiateInitialViewController];
    [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:vc animated:YES completion:NULL];
  });
}

@end
