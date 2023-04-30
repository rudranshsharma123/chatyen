import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Web3 from "web3";
import Chatyen from "../contracts/Chatayen.json";
function Copyright() {

    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/rudranshsharma123">
                Rudransh Sharma
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



const theme = createTheme();

export default function Album() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [cards, setCards] = useState([]);
    const loadBlockchainData = async () => {
        const web3 = window.web3;
        // Load account
        const accounts = await web3.eth.getAccounts();
        // this.setState({ account: accounts[0] });
        setAccount(accounts[0]);
        // this.setState({ web3: web3 });
        setWeb3(web3);
        // Network ID
        const networkId = await web3.eth.net.getId();
        const networkData = Chatyen.networks[networkId];
        if (networkData) {

            setContract(new web3.eth.Contract(Chatyen.abi, networkData.address));
        }
        console.log(networkData);
    };
    const loadWeb3 = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!",
            );
        }
    };
    useEffect(() => {
        window.ethereum.on("accountsChanged", (accounts) => {
            setAccount(accounts[0]);
        });
        const init = async () => {
            await loadWeb3();
            await loadBlockchainData();

            // setWeb3(web3Instance);
            // setContract(contractInstance);
        };
        init();
    }, []);

    const addChatbot = async (
        name,
        desc,
        buyPrice,
        leasePrice,
        leaseDuration,
        link,
    ) => {
        await contract.methods
            .addChatbot(name, desc, buyPrice, leasePrice, leaseDuration, link)
            .send({ from: account, value: web3.utils.toWei("1", "ether"), gas: 3000000, })
            .then((res) => {
                return res;
            });
    };
    const buyChatBot = async (chatBotID) => {

        const networkId = await web3.eth.net.getId();
        const networkData = Chatyen.networks[networkId];
        if (networkData) {

            setContract(new web3.eth.Contract(Chatyen.abi, networkData.address));
        }
        console.log(networkData);
        let contract = new web3.eth.Contract(Chatyen.abi, networkData.address)
        await contract.methods.buyChatbot(chatBotID).send({
            from: account, value: web3.utils.toWei("2", "ether"), gas: 3000000,
        })
            .then((res) => { return res; });
    }

    const checkAccessToBot = async (chatBotID) => {
        console.log(account);
        await contract.methods.confirmAccess(chatBotID).call({ from: account }).then((res) => { return res })
    }

    const getAllChatBots = async () => {
        const networkId = await web3.eth.net.getId();
        const networkData = Chatyen.networks[networkId];
        if (networkData) {

            setContract(new web3.eth.Contract(Chatyen.abi, networkData.address));
        }
        console.log(networkData);
        const k = await contract.methods.getChatbots().call().then((res) => { return res })
        console.log(k)
        setCards(k);

    }

    const checkLeaseAccess = async (chatBotID) => {
        const res = await contract.methods.checkAccess(chatBotID).send({ from: account, gas: 30000 }).then((res) => { return res })
        console.log(res)
    }


    useEffect(() => {
        // const init = async () => {
        //     await loadWeb3();
        //     await loadBlockchainData();

        //     // setWeb3(web3Instance);
        //     // setContract(contractInstance);
        // };
        // init();
        const timer = setTimeout(() => {
            console.log('This will run after 1 second!')
        }, 5000);
        const get = async () => {
            try {
                await getAllChatBots()
            } catch (e) {
                clearTimeout(timer());
                await getAllChatBots()
            }

        }
        get()
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Album layout
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={async () => { await getAllChatBots(); }}>Fetch Data to get Started</Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card, key) => (

                            < Grid item key={card} xs={12} sm={6} md={4} >
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.nameOfChatbot}
                                        </Typography>
                                        <Typography>
                                            {card.descOfChatbot}
                                        </Typography>
                                        <Typography>
                                            Created by:  {card.creator}
                                        </Typography>
                                        <Typography>
                                            Currently owned by:  {card.owner}
                                        </Typography>
                                        <Typography>
                                            Available to purchase?  {card.isAvailable.toString()}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Confirm Purchase</Button>
                                        <Button size="small">Fetch Details</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider >
    );
}