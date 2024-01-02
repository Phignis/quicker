
import { React , useState } from "react";
import{ Link } from "react-router-dom";

import PasswordChecklist from "react-password-checklist"
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Form,  FormControl, FormGroup, FormLabel } from "react-bootstrap";


function SignupPage(){
    const [userValue,setUserValue]=useState("");
    const [emailValue,setEmailValue]=useState("");
    const [pwdValue,setPwdValue]=useState("");
    const [cPwdValue,setCPwdValue]=useState("");
    const [verify,setVerify]= useState("");
    const nav =useNavigate();



    const [user, setUser] = useState({});
    async function SubmitHandler(event){
        event.preventDefault();

        
        if((userValue.length!==0)&&(emailValue.length!==0)&&(pwdValue===cPwdValue)){setVerify("");
           
        try {
            
     
            nav("/shop");
            
            
        
          } catch (error) {
            console.log(error.message);
          }
           }
        else{setVerify("Please verify your inormations");}
       
    }

    return(<div>
       
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh",flexDirection:"column"}}>
           
            <h1 className="text-center  mb-4" style={{fontWeight:"bold",paddingTop:"1rem"}}>Sign up</h1>
            
            <Card style={{boxShadow:" 0 2px 8px rgba(0, 0, 0, 0.2)",minWidth:"60vh",padding:"0.5rem"}}>
                <Card.Body>
                
                <Form  onSubmit={SubmitHandler} >
                        <FormGroup >
                            <FormLabel htmlFor="name">Username </FormLabel>
                            <FormControl type="text" id="name" placeHolder="username" required onChange={(e) =>setUserValue(e.target.value)} autoComplete="off"/>
                            
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor="ad">Email </FormLabel>
                            <FormControl type="email" id="ad" placeHolder="address" required onChange={(e) =>setEmailValue(e.target.value)} autoComplete="off"/>
                        </FormGroup>

                        <FormGroup >
                            <FormLabel htmlFor="pwd">Password {pwdValue}</FormLabel>
                            <FormControl  type="password" id="pwd" placeHolder="password" required on onChange={(e) =>setPwdValue(e.target.value)}/>
                        </FormGroup>

                        <FormGroup >
                            <FormLabel htmlFor="cpwd">Confirm Password {cPwdValue} </FormLabel>
                            <FormControl  type="password" id="cpwd" placeHolder=" confirm password" required onChange={(e)=>setCPwdValue(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                                <PasswordChecklist
                                rules={["minLength","number","capital","match"]}
                                minLength={5}
                                value={pwdValue}
                                valueAgain={cPwdValue}
                                onChange={(isValid) => {}}/>
                        </FormGroup>

                        <FormGroup >
                            <FormLabel style={{color:"red"}}>{user?.email}{verify}</FormLabel>
                        </FormGroup>

                        <FormGroup>
                            <Button className="w-100"type="submit"> Sign up</Button>
                        </FormGroup>

                        <FormGroup className=" mt-2">
                            <Link  to="/"> I already have an account</Link>
                            
                        </FormGroup>
                        
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    </div>
    );
}
export default SignupPage;