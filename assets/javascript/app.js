
//================================== always displayed buttons =================================


    var categories = ["dog", "cat", "bird", "goat", "pig", "lama", "cow", "turtle", "monkey", "seal"]
    
        
//===================================== get and display giphy ===================================================
        

        function displayGifs() {
            var animal = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    // Creating a div to hold the gif
                    var gifDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var gifImages = $("<img>");

                    gifImages.addClass("stillImg col-sm-6");

                    // Setting the src attribute of the image to a property pulled off the result item
                    gifImages.attr("src", results[i].images.fixed_height_still.url);
                    console.log("works");
                    // data-still
                    gifImages.attr("data-still", results[i].images.fixed_height_still.url);
                    
                    // data-animate
                    gifImages.attr("data-animate", results[i].images.fixed_height.url);
                    
                    gifImages.attr("data-state", "still");


//========================== animate/still function =======================================
        

                    $(gifImages).on("click", function () {
                        var state = $(this).attr("data-state");
                        var animate = $(this).attr("data-animate");
                        var still = $(this).attr("data-still");
                        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                        // Then, set the image's data-state to animate
                        if (state === "still") {
                            $(this).attr("src", animate);
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", still);
                            $(this).attr("data-state", "still");
                        }
                    });

                    // Displaying the rating
                    gifDiv.append(gifRating);

                    // Appending the gif
                    gifDiv.append(gifImages);

                    // Prependng the animalDiv to the HTML page in the "#gif-view" div
                    $("#gif-view").prepend(gifDiv);
                }
            });
        }

//========================== display category button =======================================


        function renderButtons() {

            // Deleting the movies prior to adding new movies
            // (this is necessary otherwise you will have repeat buttons)
            $("#animalButtons").empty();

            // Looping through the array of categories
            for (var i = 0; i < categories.length; i++) {

                // Then dynamicaly generating buttons for each movie in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var a = $("<button>");
                // Adding a class of category-btn to our button
                a.addClass("category-btn btn btn-primary");
                // Adding a data-attribute
                a.attr("data-name", categories[i]);
                // Providing the initial button text
                a.text(categories[i]);
                // Adding the button to the animalButtons div
                $("#animalButtons").append(a);
            }

            $("#animal-input").val("");
        }


//============================== on.click of button ==========================================================


        $("#add-category").on("click", function(event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var category = $("#animal-input").val().trim();

            // Adding category from the textbox to our array
            categories.push(category);

            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
        });

        // Adding a click event listener to all elements with a class of "movie-btn"
        $(document).on("click", ".category-btn", displayGifs);

        // Calling the renderButtons function to display the intial buttons
        renderButtons();


//===================== TODO ==============================


    // creates a new button -- DONE
    // button pulls from gif site -- DONE
    // rating of gif is displayed -- DONE
    // get it to grab only 10 gifs -- DONE
    // initially display gifs as stills -- DONE
    // animate/still when clicked -- DONE

