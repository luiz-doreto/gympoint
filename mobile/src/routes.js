import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import logo from '~/assets/logo-header.png';
import SignIn from '~/pages/SignIn';
import CheckIn from '~/pages/CheckIn';
import HelpOrderList from '~/pages/HelpOrder/List';
import HelpOrderShow from '~/pages/HelpOrder/Show';
import HelpOrderNew from '~/pages/HelpOrder/New';

export default isSigned =>
    createAppContainer(
        createSwitchNavigator(
            {
                Login: createSwitchNavigator({
                    SignIn,
                }),
                App: createBottomTabNavigator(
                    {
                        CheckIn,
                        HelpOrder: {
                            screen: createStackNavigator(
                                {
                                    HelpOrderList,
                                    HelpOrderShow,
                                    HelpOrderNew,
                                },
                                {
                                    defaultNavigationOptions: {
                                        headerTitle: () => (
                                            <Image source={logo} />
                                        ),
                                        headerLeftContainerStyle: {
                                            marginLeft: 20,
                                        },
                                    },
                                }
                            ),
                            navigationOptions: {
                                tabBarLabel: 'Pedir ajuda',
                                tabBarIcon: ({ tintColor }) => (
                                    <Icon
                                        name="live-help"
                                        size={20}
                                        color={tintColor}
                                    />
                                ),
                            },
                        },
                    },
                    {
                        tabBarOptions: {
                            keyboardHidesTabBar: true,
                            activeTintColor: '#ee4e62',
                            inactiveTintColor: '#999',
                            style: {
                                backgroundColor: '#FFF',
                            },
                        },
                    }
                ),
            },
            {
                initialRouteName: isSigned ? 'App' : 'Login',
            }
        )
    );
