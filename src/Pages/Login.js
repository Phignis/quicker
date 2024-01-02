
import { React , useState } from "react";
import { Button, Card, Container, Form, FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import{ Link, useNavigate} from "react-router-dom";

function LoginPage(){
    const nav=useNavigate();
    const [emailValue,setEmailValue]=useState("");
    const [pwdValue,setPwdValue]=useState("");
    const [user, setUser] = useState({});
    
    const SubmitHandler = async (e) => {
        e.preventDefault();
        
        try {
          
          nav("/shop");
        } catch (error) {
          console.log(error.message);
        }
      };

    return(<div>
        <Container className="d-flex align-items-center " style={{minHeight:"100vh",flexDirection:"column"}}>
          
          <h1 className="text-center  mb-4" style={{fontWeight:"bold",paddingTop:"1rem"}}>Login</h1>
          
          <Card style={{boxShadow:" 0 2px 8px rgba(0, 0, 0, 0.2)",minWidth:"60vh",padding:"0.5rem"}}>
              <Card.Body>
              
              <Form  onSubmit={SubmitHandler}>
              <FormGroup >
                   <FormLabel htmlFor="ad">Email </FormLabel>
                   <FormControl type="email" id="ad" placeHolder="address" autoComplete="off" required onChange={(e) =>setEmailValue(e.target.value)}/>
               </FormGroup>

               <FormGroup >
                   <FormLabel htmlFor="pwd">Password </FormLabel>
                   <FormControl type="password" id="pwd" placeHolder="password" required onChange={(e) =>setPwdValue(e.target.value)}/>
               </FormGroup>

               


             

                      <FormGroup>
                       <br/>
                       <label>{user?.email}</label>
                          <Button className="w-100"type="submit"> Login</Button>

                      </FormGroup>

                      <FormGroup className=" mt-2">
                      <Link to="/sign-up"> I don't have an account</Link>

                      </FormGroup>
                      
                  </Form>
              </Card.Body>
          </Card>
      </Container>
   </div>
   )
}
export default LoginPage ;