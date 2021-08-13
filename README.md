# 06 Web-APIs
## Section 01: General Information
Sixth code Boot Camp assignment.

`JavaScript fundamentals quiz`

by Cristobal Hernandez

Published link: 


# Section 02: General Information
This week's assignment is to make a weather application with the usage of the `https://openweathermap.org/api/one-call-api` API. Having to use local storage to store the most recent cities searched. Also, when we call the API we should see the weather for the next 5 days.

# Section 03: My experience
Beggining the project was easy. I just started using materialize and everything was getting into place.

With the JS I started by appliying the local storage for the search of the 5 cities. Had to go back to my other projects to see if there could be an answer, which I found on project #4. When the local storages were saved, I started working on them being replaced if the user typed something new. `The cities will get replaced only if they are the first 5 cities we search when the page is loaded.` After that they will not be replacing the storage.

After a long time searching on ways to get the APIs I finally managed to get it right. First I started on getting the data for today's weather conditions. Getting the API to transfer info into the other API for `lon` and `lat` was the hardest thing by far for me. Thankfully one of the videos in the references had the correct idea on how to help me.

At the end I worked on showing the 5 cards representing the next 5 days. Worked on transforming Unix into a date which was a little hard to get the info. The rest of this task's information was jsut copy paste from the today's card.

# References
`Videos viewed for code help: `
</br>
https://www.youtube.com/watch?v=3W7HUnzxQg8&ab_channel=Mr.Kaiser
</br>
https://webdesign.tutsplus.com/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893

`Convert Unix into vanilla`
</br>
https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
</br>
https://www.codegrepper.com/code-examples/javascript/convert+unix+time+to+date+javascript