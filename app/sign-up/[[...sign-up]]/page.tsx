import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SignUpPage = () => (
  <div className="h-screen w-screen flex justify-center items-center">
    <SignUp
      appearance={dark}
      afterSignUpUrl={"/new-user"}
      redirectUrl={"/new-user"}
    />
  </div>
);

export default SignUpPage;
