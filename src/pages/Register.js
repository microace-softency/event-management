import React, { useState } from 'react';
import { useEffect } from 'react';
import Box from "@mui/joy/Box";
import {
  AspectRatio,
  Button,
  Card,
  CardActions,
  CardContent,
  CardOverflow,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { CardMedia } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { create as CreateMember, checkForTicket } from '../context/memberUtils'
import { useAuth } from "../context/AuthContext";
import { ViewSidebar } from "@mui/icons-material";
import { Col, Row } from "react-bootstrap";
import PhoneAuth from "../components/PhoneAuth";

export default function Register() {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [showIsMember, setShowIsMember] = useState(''); // Initialize state
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm({ mode: 'onChange' });

  const handleBookTicket = async () => {
    console.log('hehe', user);
    if (user?.phoneNumber) {
      try {
        console.log('yess');
        const hasTicket = await checkForTicket(user?.phoneNumber);
        if (hasTicket) {
          console.log('User has ticket:', hasTicket);
          navigate(`/passes/${hasTicket}`)
        } else {
          console.log('no tickets found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('not logged in');
    }
  }

  useEffect(() => {
    console.log('yessss');
    handleBookTicket();
  }, []) // Add empty dependency array to ensure useEffect runs only once

  const onSubmit = async ({
    MemberName,
    Email,
    IsMember,
    MemberId,
    TopLeaderName,
    InvitedByName
  }) => {
    if (!user.phoneNumber) {
      return;
    }
    try {
      if (isValid) {
        const res = await CreateMember({
          MemberName,
          MobileNumber: user.phoneNumber,
          Email,
          userId: user.uid,
          EventId: "VS7ExY0IJjovzEdc48g1",
          IsMember,
          MemberId,
          entry: false,
          TopLeaderName,
          InvitedByName
        })
        console.log('res', res.id);
        navigate(`/passes/${res.id}`)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ flex: 1, width: "100%", marginTop: "3vh", padding: "5%" }}>
      <Card>
        <Col lg={12}>
          <div className="lg:w-1/2 pb-4">
            <PhoneAuth />
          </div>
        </Col>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <CardMedia
                component="div"
                className="rounded drop-shadow"
                sx={{
                  pt: "56.25%",
                }}
                image="https://www.pcma.org/wp-content/uploads/2018/10/trillion-main.jpg"
              />
            </Col>
            <Col md={6}>
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography
                  fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 2rem)"
                  className="font-bold font-serif" gutterBottom>
                  Event Name
                </Typography>
                <Typography>Date - 10/10/2024</Typography>
                <Typography>Time - 05:00 P.M to 08:00 P.M</Typography>
                <Typography>Venue - kanchrapara</Typography>
              </CardContent>
            </Col>
          </Row>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}></Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}></Stack>
              <Row>
                <Col lg={6}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Name*</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Enter your Name"
                      {...register('MemberName', { required: true })}
                    />
                  </FormControl>
                </Col>
                <Col lg={6}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      size="sm"
                      type="email"
                      minRows={3}
                      placeholder="Enter Email"
                      sx={{ flexGrow: 1 }}
                      {...register('Email')}
                    />
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Are you a member?*</FormLabel>
                    <Select
                      size="sm"
                      placeholder="Select option"
                      {...register('IsMember', { required: true })}
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </FormControl>
                </Col>
                <Col lg={6}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Member ID (if Member)</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Enter Member ID"
                      {...register('MemberId')}
                    />
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Top Diamond Leader Name (If Member)</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Enter Top Diamond Leader Name"
                      {...register('TopLeaderName')}
                    />
                  </FormControl>
                </Col>
                <Col lg={6}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Invited By Name (if not a member)</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Enter Invited By Name"
                      {...register('InvitedByName')}
                    />
                  </FormControl>
                </Col>
              </Row>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button onClick={() => { navigate('/') }} size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button type="submit" size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </form>
      </Card>
    </Box>
  );
}
