# Image Canvas Editor


## The Big Project:

We aim at developing a system to process images of manuscripts and historical items to aid history and archeology researchers. \
The front end will be Angular-based system and the back end will be based on node.js and python. \
The system will make use of a database, and we will be using Firebase.


## My Part in the Project:

In this project I have been tasked to develop the `Image Canvas (Editing)` component of the system, which supports the following things:
1. The editing of the image layer encapsulates a call to an OpenCV function on the back-end into a form of service (microservice), which is associated with a GUI element.
2. The meta-data is represented as a text or drawing.\
   The text functionality supports the insertion and editing of text blocks and changing their position. \
   The drawing should enable drawing a line, rectangle, and polygon and editing its position and the position of each one of its vertices.


## The Frontend:

The frontend is composed of 3 components, 4 microservices and a context menu to allow the user to interact with the application.

![UI.png](assets%2FUI.png)


### The Components:

1. `Image-Canvas-Editing` – The main component that holds the Canvas for editing images from the user’s Collection.
2. `Image-Link` – Support component to hold a single image from the user’s Collection. Clicking on it loads the selected image into the Canvas.
3. `Images-List` – Support component to display the user’s Collection of images. Each image in this list is an Image-Link component.


### The Microservices:

1. `Image-Canvas-Editing.Service` – The Image-Canvas-Editing component microservice that receives images to load into the Canvas.
2. `Images.Service` – The Images-List component microservice that receives the user’s Collection from the back end. The service uses to the API call: \
   `{host}:{port}/Images/`
3. `OpenCV.Service` – A microservice that sends the OpenCV Function call with the image to the back end and receives the link of the output image in Firebase to the front end. The service uses the API call: \
   `{host}:{port}/openCVHandler/`
4. `Metadata.Service` – A microservice that sends the Metadata, the user wants to save, to the back end, and receives the link of the Json text file that was created and saved in Firebase. The service uses the API call: \
   `{host}:{port}/saveMetadata/`


### The Context Menu:

The context menu supports the following options:
- `Edit Mode` – Special mode to edit the current annotations on the Canvas.
- `Edit Metadata` – Opens the window to edit the Metadata Json.
- `OpenCV Function` – Opens the window to choose an OpenCV function to send to the back end.
- `Free Draw` – Enables Free Drawing on the Canvas.
- `Text` – Enable creating Text metadata on the Canvas.
- `Polyline` – Enable creating Polyline metadata on the Canvas.
- `Polygon` – Enable creating Polygon metadata on the Canvas.
- `Rectangle` – Enable creating Rectangle metadata on the Canvas.
- `Save Metadata` – Saves the current metadata to Firebase.
- `Clear All` – Clear all the current metadata on the Canvas.

![ContextMenu.png](assets%2FContextMenu.png)


## The Backend:

The backend holds the credentials to the database that is stored on Firebase, 
handle the API calls from the frontend.

![Server.png](assets%2FServer.png)


### The Supported API Calls:
1. **GET** `{host}:{port}/Images/` - Fetch from Firebase the user’s Collection of images and send it to the front end.
2. **POST** `{host}:{port}/openCVHandler/` - Execute the OpenCV Function requested by the front end. Upload the output image to Firebase. Send the link to the image location to the front end.
3. **POST** `{host}:{port}/saveMetadata/` - Create text file fill it with the Metadata Json. Upload the text file to Firebase. Send the link to the text file location to the front end.


## The Available OpenCV Functions:

By right-click on the mouse, and selecting “OpenCV Function” option in the context menu, a new window will be opened with the following options:
1. `Gray Image` – Convert image to grayscale.
2. `Image Thresholding` – Change image thresholding.
3. `Text Detection` – Annotate detected text on the image and save it on Firebase as a text file.

![OpenCVFunctions.png](assets%2FOpenCVFunctions.png)

And there, by selecting one of the available OpenCV Functions and filling the optional Function Parameters, 
the `OpenCV.Service` microservice will perform an API call to the server and loads the returned output image to the Canvas.

Here are an example of the output images after applying each one of the OpenCV Functions:
- Top-Left: `Original Image `
- Bottom-Left: `Gray Image`
- Top-Right: `Image Thresholding`
- Bottom-Right: `Text Detection`

![CVFunctionsResults.png](assets%2FCVFunctionsResults.png)


## The Available Metadata Representations:

The metadata is represented as annotations on the image in the Canvas and can be created, updated, and deleted using the context menu options as follows:
- `Text` – Enables creating text metadata by selecting a position on the Canvas and typing the text. \
  <img src="assets%2FText.png" height="100" width="150"/>
- `Polyline` – Enables creating polyline metadata by selecting the vertices positions on the Canvas. \
  <img src="assets%2FPolyline.png" height="100" width="150"/>
- `Polygon` – Enables creating polygon metadata by selecting the vertices positions on the Canvas. \
  <img src="assets%2FPolygon.png" height="100" width="150"/>
- `Rectangle` – Enables creating rectangle metadata by selecting the 2 vertices positions on the Canvas. \
  <img src="assets%2FRectangle.png" height="100" width="150"/>
- `Edit Mode` – Enables the option to edit, and change the positions of the annotations as follows:
  - `Edit text metadata position` 
    (By left-click near the text to mark it (green), left-click again to set the mode as change position (red), and then left-click on the new position to set it there). \
    <a><img src="assets%2FTextEdit1.png" height="100" width="150"/> <img src="assets%2FTextEdit2.png" height="100" width="150"/></a>
  - `Edit text metadata text`
    (By left-click near the text to mark it (green), right-click to set the mode as change text (red with the text box opened), and then pressing enter after editing the text). \
    <a><img src="assets%2FTextEdit1.png" height="100" width="150"/> <img src="assets%2FTextEdit3.png" height="100" width="150"/></a>
  - `Edit polyline 1 vertex position`
    (By left-click near the polyline to mark it (green), left-click again to set the mode as change position (red), and then left-click on the new position to set it there). \
    <a><img src="assets%2FPolylineEdit1.png" height="100" width="150"/> <img src="assets%2FPolylineEdit2.png" height="100" width="150"/></a>
  - `Move polyline location on the Canvas`
    (By left-click near the polyline to mark it (green), right-click to set the mode as move location (red with yellow points), and then left-click on the new location to move it there). \
    <a><img src="assets%2FPolylineEdit1.png" height="100" width="150"/> <img src="assets%2FPolylineEdit3.png" height="100" width="150"/></a>
  - `Edit polygon 1 vertex position`
    (By left-click near the polygon to mark it (green), left-click again to set the mode as change position (red), and then left-click on the new position to set it there). \
    <a><img src="assets%2FPolygonEdit1.png" height="100" width="150"/> <img src="assets%2FPolygonEdit2.png" height="100" width="150"/></a>
  - `Move polygon location on the Canvas`
    (By left-click near the polygon to mark it (green), right-click to set the mode as move location (red with yellow points), and then left-click on the new location to move it there). \
    <a><img src="assets%2FPolygonEdit1.png" height="100" width="150"/> <img src="assets%2FPolygonEdit3.png" height="100" width="150"/></a>
  - `Edit rectangle 1 vertex position (Out of the 2 that defines it)`
    (By left-click near the rectangle to mark it (green), left-click again to set the mode as change position (red), and then left-click on the new position to set it there). \
    <a><img src="assets%2FRectangleEdit1.png" height="100" width="150"/> <img src="assets%2FRectangleEdit2.png" height="100" width="150"/></a>
  - `Move rectangle location on the Canvas`
    (By left-click near the rectangle to mark it (green), right-click to set the mode as move location (red with yellow points), and then left-click on the new location to move it there). \
    <a><img src="assets%2FRectangleEdit1.png" height="100" width="150"/> <img src="assets%2FRectangleEdit3.png" height="100" width="150"/></a>
- `Edit Metadata` – Enables opening the window for editing the current Metadata JSON. \
  <img src="assets%2FMetadata.png" height="300" width="400"/>
- `Save Metadata` – Calls the `Metadata.Service` microservice and receives the link to the Metadata Json text file on Firebase.
- `Clear All` – Deletes all the current metadata annotations on the Canvas.


## Requirements:

### Angular UI (Frontend)

- `anguler 13.3.0` or lower
- `node.js 18.16.0` or lower
- [package.json](angular-ui%2Fpackage.json)


### Django Firebase (Backend)

- `python3.8` or higher
- [requirements.txt](django-firebase%2Frequirements.txt)
