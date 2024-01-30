import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

const SignInPage = () => (
  <div className="h-screen w-screen flex justify-center items-center">
    <SignIn
      appearance={neobrutalism}
      afterSignUpUrl={"/new-user"}
      redirectUrl={"/new-user"}
    />
  </div>
);

export default SignInPage;
