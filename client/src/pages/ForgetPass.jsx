import { Input, Modal, Button, Message, useToaster } from "rsuite";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const toaster = useToaster();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [timer, setTimer] = useState(300);
  const [intervalId, setIntervalId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const navigate = useNavigate();

  // Submit email to receive OTP
  async function handleSubmit() {
    if (!email) {
      toaster.push(
        <Message type="error" header="A problem occurred" showIcon closable>
          <strong>Error!</strong> Please enter an email.
        </Message>,
        { placement: "topCenter", duration: 5000 }
      );
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/forgetpassword`,
        { email }
      );
      setUserId(response.data.userId);
      setShowModal(true);
      startTimer();
    } catch (err) {
      toaster.push(
        <Message type="error" header="A problem occurred" showIcon closable>
          <strong>Error!</strong>{" "}
          {err.response?.data?.message || "An error occurred"}
        </Message>,
        { placement: "topCenter", duration: 5000 }
      );
    } finally {
      setLoading(false);
    }
  }

  // Handle OTP verification and display password reset form
  async function handleSubmitCode() {
    try {
      await axios.post(`http://localhost:8080/otpverify`, {
        otp: code,
        email: email,
      });
      setIsCodeVerified(true);
      setShowModal(false);
    } catch (err) {
      toaster.push(
        <Message type="error" header="A problem occurred" showIcon closable>
          <strong>Error!</strong>{" "}
          {err.response?.data?.message || "An error occurred"}
        </Message>,
        { placement: "topCenter", duration: 5000 }
      );
    }
  }

  // Handle new password submission
  async function handleSubmitPassword() {
    if (newPassword !== confirmPassword || !newPassword) {
      toaster.push(
        <Message type="error" header="A problem occurred" showIcon closable>
          <strong>Error!</strong> Passwords do not match or are empty.
        </Message>,
        { placement: "topCenter", duration: 5000 }
      );
      return;
    }
    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/reset`, {
        password: newPassword,
        email: email,
      });
      navigate("/login");
    } catch (err) {
      toaster.push(
        <Message type="error" header="A problem occurred" showIcon closable>
          <strong>Error!</strong>{" "}
          {err.response?.data?.message || "An error occurred"}
        </Message>,
        { placement: "topCenter", duration: 5000 }
      );
    } finally {
      setLoading(false);
    }
  }

  // Timer for OTP modal
  function startTimer() {
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setShowModal(false);
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  }

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div className="w-full h-[80vh] bg-gray-200 p-6 flex flex-col items-center justify-center">
      <div className="bg-white w-[70%] sm:w-[40%] p-3 rounded-lg">
        {!isCodeVerified ? (
          <>
            <Input
              type="text"
              placeholder="Enter your email"
              onChange={(value) => setEmail(value)}
              className="mt-3"
            />
            <Button
              onClick={handleSubmit}
              loading={loading}
              className="btn btn-primary mt-3"
            >
              Get OTP
            </Button>
          </>
        ) : (
          <>
            <Input
              type="password"
              placeholder="New Password"
              onChange={(value) => setNewPassword(value)}
              className="mt-3"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(value) => setConfirmPassword(value)}
              className="mt-2"
            />
            <Button
              onClick={handleSubmitPassword}
              loading={loading}
              className="btn btn-primary mt-3"
            >
              Reset Password
            </Button>
          </>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            placeholder="Enter OTP"
            onChange={(value) => setCode(value)}
          />
          <p className="text-right text-sm mt-2">
            Time remaining: {`${Math.floor(timer / 60)}:${timer % 60}`}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmitCode} className="btn btn-primary">
            Confirm
          </Button>
          <Button onClick={() => setShowModal(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
