import {
  Navigation,
  NavigationButtonPressedEvent,
  OptionsModalPresentationStyle,
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  CommandCompletedEvent,
  ModalDismissedEvent,
  BottomTabSelectedEvent,
  SearchBarUpdatedEvent,
  PreviewCompletedEvent,
  SearchBarCancelPressedEvent,
  Options,
} from 'react-native-navigation';

import { useLayoutEffect } from 'react';

function useNavigationComponentDidAppear(
  handler: (event: ComponentDidAppearEvent) => void,
  componentId?: string,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidAppearListener(
      (event) => {
        const equalComponentId = event.componentId === componentId;

        if (componentId && !equalComponentId) {
          return;
        }

        handler(event);
      },
    );

    return () => subscription.remove();
  }, [handler, componentId]);
}

function useNavigationComponentDidDisappear(
  handler: (event: ComponentDidDisappearEvent) => void,
  componentId?: string,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidDisappearListener(
      (event) => {
        const equalComponentId = event.componentId === componentId;

        if (componentId && !equalComponentId) {
          return;
        }

        handler(event);
      },
    );

    return () => subscription.remove();
  }, [handler, componentId]);
}

function useNavigationCommand(
  handler: (name: string, params: any) => void,
  commandName?: string,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerCommandListener(
      (name, params) => {
        const equalCommandName = name === commandName;

        if (commandName && !equalCommandName) {
          return;
        }

        handler(name, params);
      },
    );

    return () => subscription.remove();
  }, [handler, commandName]);
}

function useNavigationCommandComplete(
  handler: (event: CommandCompletedEvent) => void,
  commandName?: string,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerCommandCompletedListener(
      (event) => {
        const equalCommandName = event.commandName === commandName;

        if (commandName && !equalCommandName) {
          return;
        }

        handler(event);
      },
    );

    return () => subscription.remove();
  }, [handler, commandName]);
}

function useNavigationModalDismiss(
  handler: (event: ModalDismissedEvent) => void,
  componentId?: string,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerModalDismissedListener(
      (event) => {
        const equalComponentId = event.componentId === componentId;

        if (componentId && !equalComponentId) {
          return;
        }

        handler(event);
      },
    );

    return () => subscription.remove();
  }, [handler, componentId]);
}

function useNavigationBottomTabSelect(
  handler: (event: BottomTabSelectedEvent) => void,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerBottomTabSelectedListener(
      handler,
    );

    return () => subscription.remove();
  }, [handler]);
}

function useNavigationButtonPress(
  handler: (event: NavigationButtonPressedEvent) => void,
  componentId?: string,
  buttonId?: string,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener(
      (event) => {
        const equalComponentId = event.componentId === componentId;
        const equalButtonId = event.buttonId === buttonId;

        if (
          (componentId && !equalComponentId) ||
          (buttonId && !equalButtonId)
        ) {
          return;
        }

        handler(event);
      },
    );

    return () => subscription.remove();
  }, [handler, componentId, buttonId]);
}

function useNavigationSearchBarUpdate(
  handler: (event: SearchBarUpdatedEvent) => void,
  componentId?: string,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerSearchBarUpdatedListener(
      (event) => {
        const equalComponentId = event.componentId === componentId;

        if (componentId && !equalComponentId) {
          return;
        }

        handler(event);
      },
    );

    return () => subscription.remove();
  }, [handler, componentId]);
}

function useNavigationSearchBarCancelPress(
  handler: (event: SearchBarCancelPressedEvent) => void,
  componentId?: string,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerSearchBarCancelPressedListener(
      (event) => {
        const equalComponentId = event.componentId === componentId;

        if (componentId && !equalComponentId) {
          return;
        }

        handler(event);
      },
    );

    return () => subscription.remove();
  }, [handler, componentId]);
}

function useNavigationPreviewComplete(
  handler: (event: PreviewCompletedEvent) => void,
  componentId?: string,
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerPreviewCompletedListener(
      (event) => {
        const equalComponentId = event.componentId === componentId;

        if (componentId && !equalComponentId) {
          return;
        }

        handler(event);
      },
    );

    return () => subscription.remove();
  }, [handler, componentId]);
}

export const push = ({ rootId, targetName, options = {}, passProps = {} }) => {
  return Navigation.push(rootId, {
    component: {
      name: targetName,
      options: {
        ...options,
        popGesture: true,
      },
      passProps: { ...passProps },
    },
  });
};

export const pop = (componentId) => {
  return Navigation.pop(componentId);
};

export const showOverlay = ({ componentName, passProps = {} }) => {
  return Navigation.showOverlay({
    component: {
      options: {
        layout: {
          backgroundColor: 'transparent',
          componentBackgroundColor: 'transparent',
        },
      },
      name: componentName,
      passProps,
    },
  });
};

export const showFullScreenModal = ({ componentName, passProps = {} }) => {
  return Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: componentName,
            passProps,
            options: {
              layout: {
              },
              modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
            },
          },
        },
      ],
    },
  });
}

export const showModal = ({
  componentName,
  passProps = {},
  isComponent = false,
  options = {},
}) => {
  if (!isComponent) {
    return Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: componentName,
              passProps,
              options: {
                layout: {
                },
                modalPresentationStyle: OptionsModalPresentationStyle.pageSheet,
                ...options,
              },
            },
          },
        ],
      },
    });
  } else {
    Navigation.showModal({
      component: {
        name: componentName,
        passProps,
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
          },
          layout: {
            backgroundColor: 'white',
            componentBackgroundColor: 'white',
          },
          modalPresentationStyle: OptionsModalPresentationStyle.pageSheet,
        },
      },
    });
  }
};

export {
  useNavigationComponentDidAppear,
  useNavigationComponentDidDisappear,
  useNavigationCommand,
  useNavigationCommandComplete,
  useNavigationModalDismiss,
  useNavigationBottomTabSelect,
  useNavigationButtonPress,
  useNavigationSearchBarUpdate,
  useNavigationSearchBarCancelPress,
  useNavigationPreviewComplete,
};
