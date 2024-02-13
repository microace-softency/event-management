import React, { useState, useEffect } from 'react';
import { Button } from '@mui/joy';
import { Box } from '@mui/joy';
import { QRCode } from 'react-qr-code';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchEventData } from '../context/memberUtils';
import html2canvas from 'html2canvas';



const Home = () => {
    const { user } = useAuth();
    const [qrData, setQrData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname;
    const parts = url.split("/");
    const model = parts[parts.length - 1];

    const exportAsImage = async (el, imageFileName) => {
        console.log(el);
        const canvas = await html2canvas(el);
        const image = canvas.toDataURL("image/png", 1.0);
        // download the image
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = image;
        link.download = imageFileName;

        // Trigger the download by programmatically clicking the link
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link from the DOM
        document.body.removeChild(link);
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const tickets = await fetchEventData(model, user.phoneNumber);
                setQrData(tickets);
                console.log(tickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [model, user.phoneNumber]);

    const handleDownloadQRCode = async (ticket) => {
        try {
            // Capture the ticket element as an image using html2canvas
            const ticketElement = document.getElementById(`ticket_${ticket.MobileNumber}`);
            const imageFileName = `ticket_${ticket.MobileNumber}.png`;
            await exportAsImage(ticketElement, imageFileName);
        } catch (error) {
            console.error('Error downloading QR code:', error);
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                bgcolor: 'background.body',
                padding: '15px'
            }}
        >
            <Box>
                <div className='flex justify-between'>
                    <h2>Your Tickets</h2>
                    <Button onClick={() => navigate('/')}>Back</Button>
                </div>
                {qrData.map((ticket, index) => (
                    <>
                        <div key={index} id={`ticket_${ticket.MobileNumber}`} className='bg-slate-200 lg:w-1/3 md:w-1/2 rounded shadow-xl m-4 p-4'>
                            <div className='text-center text-2xl mb-0'>
                            <p className={`${ticket.IsMember === 'Yes' ? 'text-blue-600': 'text-green-800'}`}>
                                        {ticket.IsMember === 'Yes' ? 'Member': 'Invitation'}
                                    </p>
                                <p className='text-xl font-bold'>
                                    {ticket.MemberName.toUpperCase()}
                                    
                                </p>
                            </div>
                            <div className='flex justify-center'>
                                <QRCode size='150' value={ticket.MobileNumber} />
                            </div>
                            <div className='p-2 text-center'>
                            <p className='text-xl font-bold mb-0'>
                                12th Feb, 4 PM Onwards
                            </p>
                            </div>
                            <div className='p-2 text-center'>
                            <p className='text-lg font-bold mb-0'>
                                Ritwik Sadan Kalyani
                            </p>
                            <p className='text-md font-bold text-slate-500 mb-0'>
                                Kalyani Stn Rd Connector, B 11, 741235
                            </p>
                            </div>
                            <div className="flex flex-col justify-center py-2">
                                <div className='text-center py-1 font-semibold text-slate-500 text-xl'>{ticket.MobileNumber}</div>
                                {ticket?.TopLeaderName && <div><strong>Top Leader:</strong> {ticket.TopLeaderName}</div>}
                                {ticket?.InvitedByName && <div><strong>Invited By:</strong> {ticket.InvitedByName}</div>}
                            </div>
                        </div>
                        <div className='p-4 flex justify-center'>
                            <Button className='shadow' onClick={() => handleDownloadQRCode(ticket)}>Download</Button>
                        </div>
                    </>

                ))}
            </Box>
        </Box>
    );
}

export default Home;
