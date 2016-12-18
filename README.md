# Kinetic Typography Chat with Empatica E4

This is an instant messenger which operates between multiple two computers, each pointing to localhost:3000 and using the Heroku app at https://kt-eda.herokuapp.com/ as a server. After setting a username, the user will see their messages on the right side and an animation preview and a streaming biofeedback chart on the left side.

## Animation Preview
As the user types, they will see their text animated in the "Animation Preview" div. The speed of the animation will be in either a high or low state, depending on their biofeedback.

If the user's current EDA value is above their baseline, the animation will play quickly. If they are below their baseline, the animation will play slowly. Note that the animation speed will only update when the user types.

## Effect Library
The user can click "Choose Effect" to change the style of their animation to one of five animations: bounce, swing, squash, floating, and shake. The "Choose Effect" button opens a window previewing each animation with the current typed text, highlighting the effect currently selected. If the user clicks on another effect, the effect library modal will close and the Animation preview will update to animate the text with the new effect. Though the effect will change, the speed of each effect is still determined by whether the user is above or below their baseline.

## Effect Sharing
By default, each user shares their effect with the other user. They can click or unclick the "Sharing" checkbox throughout the chat to share their message either with an effect (Sharing checked) or as plain text (Sharing unchecked). After sending a message with sharing on, both chat users will see the animation play once and then stop. Either user can hover over the message in the chat history to replay the effect. Messages are assigned a numerical ID and sent through the chat with speed, effect, and sharing properties.

## Smoothie chart
Each chat user sees their biofeedback data reflected in a streaming line graph. If there are not enough baseline values, the chart label will read "Calculating Baseline." If there are no values in the gsrData.txt file, the label will read "Connect to E4." Once there are enough baseline values, the chart will plot the user's current EDA value against the average of their baseline values.

If the user's current EDA value is above their baseline, a label will read "Above Baseline." If they are below their baseline, the label will read "Below Baseline."

# Instructions for Testing:

To test on one computer:

1. cd bio-kinetic-typography-chat
2. Make sure there are several hundred lines of test data in the gsrData.txt file
3. node local-server.js
4. Go to http://localhost:3000 in a browser
5. Open another browser with the same url to communicate between two browsers

To test on two computers:

1. Make sure bio-kinetic-typography-chat repo is synced on each computers
On each computer:
2. Make sure there are several hundred lines of test data in the gsrData.txt file in each repo
3. cd bio-kinetic-typography-chat
4. node local-server.js
5. Go to http://localhost:3000 in a browser

# Instructions for Running on Two Computers with the Empatica E4

On each computer:

1. In each computer's text folder, delete all the data in gsrData.txt and leave blank.
2. Connect each computer to an Android phone via a USB charging cable.
3. Open the EmpApp project in Android Studio.
4. In Network Preferences, check what the IP address of your computer is.
5. In MainActivity.java ( in the EmpApp app folder ) change the url variable ( in method didVolleyPost() ) to the current IP address, that you just found, at port 8080. So if your IP address is 128.237.210.49 then change url to “http://128.237.210.49:8080/”
6. Go to http://128.237.210.49:8080/ in one of your browser tabs and minimize it. Make sure the user doesn’t exit out of that tab during the experiment.
7. Go to the public folder (where index.php is) and run php -S 128.237.210.49:8080
8. Check the browser again, and it should say {“bvp”:null}
9. Wake up the Android phone. Run the code. It might ask you to confirm that you want to run it on the Nexus phone. Turn on the E4 wristband once the white screen pops up on the phone. On the Nexus phone it should now say that “Empatica is connecting” and then “is connected.” All the data should show up on the phone, but it takes 20 - 60 seconds for IBI data to show up after turning it on.
10. Open up the gsrData.txt file and wait for the file to start populating with values. Starting from the 3rd line, the first 120 values will be the baseline. Adjust this number in the numBaselineValues variable linegraph.js for a longer/shorter baseline period.
11. Once enough values have accumulated, refresh the browser windows at http://localhost:3000. The graph label should read "Baseline Calculated" and start plotting the current values against the average of the baseline values. If there are not enough baseline values, the label will read "Calculating Baseline." If the gsrData.txt file is still blank, it will read "Connect to E4."
12. Once E4 is disconnected, the graph will continue plotting the last value in the gsrData.txt file. Clear this file to reset the chat for a new user.
