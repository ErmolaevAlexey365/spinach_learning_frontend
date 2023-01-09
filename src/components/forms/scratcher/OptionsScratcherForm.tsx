import React from 'react';
import {Checkbox, FormControlLabel, FormGroup, Switch, TextField, Typography} from "@mui/material";
import styles from "../../../styles/dashboard/dashboard.module.css";

const OptionsScratcherForm = () => {
    return (
        <div className={styles.scratcherForm_options}>
            <Typography variant="h5" component="h1">
                Options
            </Typography>
            <Typography component="h2">Search:</Typography>

            <TextField size="small" placeholder="Search" />
            <FormGroup>
                <FormControlLabel
                    control={<Switch />}
                    label="U.S. only"
                    className={styles.switch}
                />
            </FormGroup>
            <Typography component="h2">Experience level:</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Entry level" />
                <FormControlLabel control={<Checkbox />} label="Intermediate" />

                <FormControlLabel control={<Checkbox />} label="Expert" />
            </FormGroup>
            <hr style={{background:'black',width:'100%'}}/>
            <Typography component="h2">Client info:</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="My previous clients" />
                <FormControlLabel control={<Checkbox />} label="Payment verified" />
            </FormGroup>
            <hr style={{background:'black',width:'100%'}}/>

            <Typography component="h2">Client history:</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="No hires" />
                <FormControlLabel control={<Checkbox />} label="1 to 9 hires" />
                <FormControlLabel control={<Checkbox />} label="10+ hires" />
            </FormGroup>
            <hr style={{background:'black',width:'100%'}}/>
            <Typography component="h2">Hours per week:</Typography>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Less than 30 hrs/week"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="More than 30 hrs/week"
                />
            </FormGroup>
            <hr style={{background:'black',width:'100%'}}/>
            <Typography component="h2">Freelancers needed:</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="1" />
                <FormControlLabel control={<Checkbox />} label="2 to 5" />
                <FormControlLabel control={<Checkbox />} label="More than 5" />
                <FormControlLabel control={<Checkbox />} label="All" />
                <FormControlLabel control={<Checkbox />} label="Single freelancer" />
                <FormControlLabel control={<Checkbox />} label="Multiple freelancer" />
            </FormGroup>
            <hr style={{background:'black',width:'100%'}}/>
            <Typography component="h2">Number of Proposals:</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Less than 5" />
                <FormControlLabel control={<Checkbox />} label="5 to 10" />
                <FormControlLabel control={<Checkbox />} label="10 to 15" />
                <FormControlLabel control={<Checkbox />} label="15 to 20" />
                <FormControlLabel control={<Checkbox />} label="20 to 50" />
            </FormGroup>
            <hr style={{background:'black',width:'100%'}}/>
            <Typography component="h2">Connect needed:</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="2 or less Connects" />
                <FormControlLabel control={<Checkbox />} label="4 Connects" />
                <FormControlLabel control={<Checkbox />} label="6 Connects" />
            </FormGroup>
            <hr style={{background:'black',width:'100%'}}/>
            <Typography component="h2">Job Type:</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Hourly" />
                <FormControlLabel control={<Checkbox />} label="Fixed-Price" />
            </FormGroup>
            <hr style={{background:'black',width:'100%'}}/>
            <Typography component="h2">Project length:</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Less than 1 month" />
                <FormControlLabel control={<Checkbox />} label="1 to 3 month" />
                <FormControlLabel control={<Checkbox />} label="3 to 6 month" />
                <FormControlLabel control={<Checkbox />} label="More than 6 month" />
            </FormGroup>
            <hr style={{background:'black',width:'100%'}}/>
            <Typography component="h2">Category:</Typography>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Accounting & Consulting"
                />
                <FormControlLabel control={<Checkbox />} label="Admin Support" />
                <FormControlLabel control={<Checkbox />} label="Customer Service" />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Data Science & Analytics"
                />
                <FormControlLabel control={<Checkbox />} label="Design & Creative" />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Engineering & Architecture"
                />
                <FormControlLabel control={<Checkbox />} label="IT & Networking" />
                <FormControlLabel control={<Checkbox />} label="Legal" />
                <FormControlLabel control={<Checkbox />} label="Sales & Marketing" />
                <FormControlLabel control={<Checkbox />} label="Translation" />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Web? Mobile & Software Dev"
                />
                <FormControlLabel control={<Checkbox />} label="Writing" />
            </FormGroup>
            <Typography component="h2">Location:</Typography>

            <TextField size="small" label="Location"   select />
            <Typography component="h2">Client time zones:</Typography>

            <TextField size="small" label="Time zone"  select />
        </div>
    );
};

export default OptionsScratcherForm;