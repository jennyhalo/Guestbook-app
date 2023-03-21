//Get the form element by id
let messageform = document.getElementById("messageform");
//Define the event handler for the form when it's submitted
messageform.addEventListener("submit", async (e) => {
    //Prevent browser default behavior
    e.preventDefault();
  
  //get all form fields
  let form = e.currentTarget;

// get the URL for api endpoint
let url = form.action;

try {

  // Form field instance
  let formData = new FormData(form);

  //Call the `postFormFieldsJson()` function
  let responseData = await postFormFieldsAsJson({ url, formData });

  // Destructure the response data
  let { serverDataResponse } = responseData;

  console.log(serverDataResponse);

} catch (error) {

  // handle errors
  console.error(error);
}
});

// POST data as JSON using fetch

async function postFormFieldsAsJson({ url, formData }) {
  //create an object from form data entires
  let formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);

  //Set the fetch options (headers, body)

  let fetchOptions = {
// HTTP method set to POST
    method: "POST",
    // Set the headers that specify you're sending a JSON bosy request and accepting a JSON responce
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    // POST request body as JSON string
    body: formDataJsonString,
  };

  //Get the response body as JSON
  let res = await fetch(url, fetchOptions);
 //If the response if faulty, throw an error
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  //If the responce was OK, return responce body
  return res.json();

}