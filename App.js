import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import BookmarkProvider from './Bookmark/BookmarkProvider';
import HomeScreen from './screens/HomeScreen';
import ProfileStack from './screens/ProfileStack';
import { Linking } from 'react-native';

export default function AppWrapper() {
  return (
    <BookmarkProvider>
      <App />
    </BookmarkProvider>
  );
}

const Tab = createBottomTabNavigator(); 

export function App() {
  Linking.addEventListener('url', (event) => {
    console.log(event.url);
    // Handle the received link here
  });
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Article AI') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          "tabBarActiveTintColor": "blue",
          "tabBarInactiveTintColor": "gray",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
        })}
      >
        <Tab.Screen name="Article AI" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('App', () => AppWrapper);