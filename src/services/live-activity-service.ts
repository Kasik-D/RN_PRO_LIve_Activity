import {NativeEventEmitter, NativeModules, Platform} from 'react-native';

const myModuleEvt = new NativeEventEmitter(NativeModules.LiveActivitiModule);

const LiveActivity = NativeModules.LiveActivity
  ? NativeModules.LiveActivity
  : new Proxy(
      {},
      {
        get() {
          throw new Error('hmm');
        },
      },
    );

const clearAllActivities = async () => {
  if (!(Platform.OS === 'ios')) {
    return;
  }

  myModuleEvt.removeAllListeners('SomeEvent');

  try {
    const activities = await LiveActivity.listAllActivities();

    if (!activities.length) {
      return;
    }

    activities.forEach(async (act: {id: string}) => {
      if (act.id) {
        await LiveActivity.endActivity(act.id);
      }
    });
  } catch (error) {
    console.log({error});

    return;
  }
};

const startLiveActivities = async (
  setActivityTokenId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (!(Platform.OS === 'ios')) {
    return;
  }
  try {
    await clearAllActivities();
    console.log('token ');

    myModuleEvt.addListener('SomeEvent', token => {
      console.log('token ', token);

      if (token.id) {
        setActivityTokenId(token.id);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const endLiveActivities = async () => {
  if (!(Platform.OS === 'ios')) {
    return;
  }
  try {
    await clearAllActivities();
  } catch (error) {
    console.error(error);
  }
};

const updateLiveActivity = async (activityTokenId: string | null) => {
  console.log('activityTokenId ', activityTokenId);
  if (!(Platform.OS === 'ios')) {
    return;
  }

  try {
    if (!activityTokenId) {
      return;
    }
    console.log('activityTokenId ', activityTokenId);
    await LiveActivity.updateActivity(activityTokenId, '🤩');
  } catch (error) {
    console.log(error);
  }
};

export const LiveActivityService = {
  startLiveActivities,

  endLiveActivities,

  updateLiveActivity,

  clearAllActivities,
};
