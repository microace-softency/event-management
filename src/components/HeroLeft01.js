/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TwoSidedLayout from "../components/TwoSidedLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { checkForTicket } from '../context/memberUtils'
export default function HeroLeft01() {
  const navigate = useNavigate();


  return (
    <TwoSidedLayout>
      <Typography color="primary" fontSize="lg" fontWeight="lg">
        Collect Event Tickets:
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        "Secure Your Spot: Reserve Tickets!"
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        Unlocking the Secrets of Profitable Trading !<br />
        Education, Strategy, Success !
      </Typography>
      <h2 className="text-orange-600 m-0 font-bold">INVITATION</h2>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="sm">
        We are delighted to extend a cordial invitation to you for 
        a special as we have the honor of hosting out esteemed 
        Managing Director.
      </Typography>
      <Button
        onClick={() => { navigate('/register') }}
        size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
        Reserve Tickets
      </Button>
    </TwoSidedLayout>
  );
}
