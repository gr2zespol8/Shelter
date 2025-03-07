import {React, useState, useEffect} from 'react'
import {Button, Card, Container,Row,Col} from 'react-bootstrap'
import {storage} from './firebase-config'
import {
  ref,
  getDownloadURL,
  listAll
} from "firebase/storage";
import MainFeaturedPost from './MainFeaturedPost';

function AnimalsDisplay() {

  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "animal_pics/");

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  


  return (
    
      
      <div class="container pt-5 pb-3 px-lg-5 mb-5">
        <h1 class="mb-5">Te zwierzaki czekają na adopcję</h1>
        <Row>
        {imageUrls.map((url) => {
          return (

            <Col className="col-3 mb-5">
              <Card className="flex-fill">
              <Card.Img variant="top" src={url}/>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  
                {url.substr(86,(url.indexOf('.jpeg')-86))}
                </Card.Text>
                
              </Card.Body>
              </Card>
            </Col>
        );
        })}
        </Row>
        <div class="container pt-5 pb-3 px-lg-5 mb-5">
        <h1 class="mb-5">Current Affairs</h1>
        
        </div>
        </div>
  )
}


export default AnimalsDisplay