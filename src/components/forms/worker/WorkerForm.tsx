import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../../../styles/dashboard/dashboard.module.css";
import location from "../../../assets/json/locations.json";
import timezone from "../../../assets/json/timezones.json";
import { useForm, Controller } from "react-hook-form";
import { IScratchFormProps, IWorkerData } from "../../../interfaces/interfaces";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { schemaWorker } from "../../schemas/Schema";




const WorkerForm = ({ clickHandlerForCloseModal,submitForm,upworkAccounts }: IScratchFormProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLocationData, setIsLocationData] = useState<any[]>([]);
  const [isHourly, setIsHourly] = useState<boolean>(false);
  const [isFixedPrice, setIsFixedPrice] = useState<boolean>(false);
  const [hourlyNumberMin, setHourlyNumberMin] = useState<any>("");
  const [hourlyNumberMax, setHourlyNumberMax] = useState<any>("");
  const [FixedPriceNumberMin, setFixedPriceNumberMin] = useState<any>("");
  const [FixedPriceNumberMax, setFixedPriceNumberMax] = useState<any>("");
  const [isFixedPriceChecked, setIsFixedPriceChecked] = useState<boolean>(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IWorkerData>({
    defaultValues: {
      enableScoring: [false],
      title: "",
      description: "",
      q: "",
      contractor_tier: [false, false, false],
      previous_clients: [false],
      payment_verified: [false],
      client_hires: [false, false, false],
      workload: [false, false],
      freelancers_needed: [false, false, false, false, false, false],
      proposals: [false, false, false, false, false],
      connect_price: [false, false, false],
      duration_v3: [false, false, false, false],
      category2_uid: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      user_location_match: [2],
      location: "",
      timezones: "",
      t: [false, false],
      amount: [false, false, false, false, false, false],
    },
    mode: "onSubmit",
    resolver: yupResolver(schemaWorker),
  });

  const falseOrValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      return (e.target.value = "false");
    } else {
      return e.target.value;
    }
  };

  function onOrOff(e: React.ChangeEvent<HTMLInputElement>) {
    setValue("location", " ");
    setIsChecked(!isChecked);
    if (!e.target.checked) {
      return (e.target.value = "2");
    } else {
      setIsLocationData([]);
      return e.target.value;
    }
  };

  useEffect(() => {
    if (!isHourly) {
      setValue("hourly_rate.0", false);
    }
    if (!isFixedPrice) {
      setValue("amount", [false, false, false, false, false, false]);
    }
    setIsFixedPriceChecked(false);
  }, [isHourly, isFixedPrice]);


  function inputHourlyMin(e: React.ChangeEvent<HTMLInputElement>) {
    let str: string | any;
    setHourlyNumberMin(e.target.value);
    if (!e.target.value) {
      str = false;
    } else {
      str = e.target.value + "-" + hourlyNumberMax;
    }
    return str;
  };

  function inputHourlyMax(e: React.ChangeEvent<HTMLInputElement>) {
    let str: string | any;
    setHourlyNumberMax(e.target.value);
    str = hourlyNumberMin + "-" + e.target.value;
    return str;
  };

  const inputFixedPriceMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str: string | any;
    setFixedPriceNumberMin(e.target.value);
    if (e.target.value) {
      setIsFixedPriceChecked(true);
    }
    if (!e.target.value && !FixedPriceNumberMax) {
      setIsFixedPriceChecked(false);
      str = false;
    } else {
      str = e.target.value + "-" + FixedPriceNumberMax;
    }
    return str;
  };

  const inputFixedPriceMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str: string | any;
    setFixedPriceNumberMax(e.target.value);
    if (e.target.value) {
      setIsFixedPriceChecked(true);
    }
    if (!e.target.value && !FixedPriceNumberMin) {
      setIsFixedPriceChecked(false);
      str = false;
    } else {
      str = FixedPriceNumberMin + "-" + e.target.value;
    }
    return str;
  };

  function locationData(data: any) {
    setIsChecked(false);
    setIsLocationData(data);
    setValue("user_location_match.0", "2");
    let result: any[] = [];
    data.map((e: any) => {
      result.push(e.value);
    });
    return result;
  }
  return (
    <>
      <Typography variant="h5" component="h4">
        Add worker
      </Typography>
      <form onSubmit={handleSubmit((data:any)=>{
        submitForm(data)

      })}>
        <div className={styles.scratcherForm_input}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                label="Title"
                helperText={errors.title?.message}
                error={!!errors.title}
                {...field}
              />
            )}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Set timer</InputLabel>

              <Controller
                name="timer"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Set timer"
                    error={!!errors.timer}
                    {...field}
                  >
                    <MenuItem value={2}>2min</MenuItem>
                    <MenuItem value={5}>5min</MenuItem>
                    <MenuItem value={10}>10min</MenuItem>
                    <MenuItem value={15}>15min</MenuItem>
                    <MenuItem value={30}>30min</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText
                style={{ background: "#e5f4ff", margin: "0", color: "#d32f2f" }}
              >
                {errors.timer?.message}
              </FormHelperText>
            </FormControl>
          </Box>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                label="Description"
                multiline
                rows={2}
                maxRows={4}
                {...field}
              />
            )}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Upwork accounts
              </InputLabel>
              <Controller
                name="account"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Upwork accounts"
                    error={!!errors.account}
                    {...field}
                  >
                    {upworkAccounts.map((option: any) => (
                      <MenuItem value={option.id}>{option.name}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText
                style={{ background: "#e5f4ff", margin: "0", color: "#d32f2f" }}
              >
                {errors.timer?.message}
              </FormHelperText>
            </FormControl>
          </Box>
        </div>
        <div>
          <FormGroup>
            <FormControlLabel
              style={{ marginTop: 0 }}
              control={
                <Controller
                  name="enableScoring.0"
                  control={control}
                  render={({ field: { value } }) => <Switch value={false} />}
                />
              }
              label="Enable scoring"
              className={styles.switch}
            />
          </FormGroup>
        </div>

        <div className={styles.scratcherForm_options}>
          <Typography variant="h5" component="h1">
            Options
          </Typography>
          <Typography component="h2">Search:</Typography>

          <Controller
            name="q"
            control={control}
            render={({ field }) => (
              <TextField size="small" label="Search" {...field} />
            )}
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="user_location_match.0"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Switch
                      value={"1"}
                      checked={isChecked}
                      onChange={(e) => onChange(onOrOff(e))}
                    />
                  )}
                />
              }
              label="U.S. only"
              className={styles.switch}
            />
          </FormGroup>

          <Typography component="h2">Experience level:</Typography>

          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="contractor_tier.0"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      value={"1"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Entry level"
            />
            <FormControlLabel
              label="Intermediate"
              control={
                <Controller
                  name="contractor_tier.1"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"2"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
            />

            <FormControlLabel
              label="Expert"
              control={
                <Controller
                  name="contractor_tier.2"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"3"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
            />
          </FormGroup>

          <hr style={{ background: "black", width: "100%" }} />

          <Typography component="h2">Client info:</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="previous_clients.0"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"all"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="My previous clients"
            />

            <FormControlLabel
              control={
                <Controller
                  name="payment_verified.0"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"1"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Payment verified"
            />
          </FormGroup>

          <hr style={{ background: "black", width: "100%" }} />

          <Typography component="h2">Client history:</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="client_hires.0"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"0"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="No hires"
            />
            <FormControlLabel
              control={
                <Controller
                  name="client_hires.1"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"1-9"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="1 to 9 hires"
            />
            <FormControlLabel
              control={
                <Controller
                  name="client_hires.2"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"10-"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="10+ hires"
            />
          </FormGroup>

          <hr style={{ background: "black", width: "100%" }} />

          <Typography component="h2">Hours per week:</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="workload.0"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"as_needed"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Less than 30 hrs/week"
            />
            <FormControlLabel
              control={
                <Controller
                  name="workload.1"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"full_time"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="More than 30 hrs/week"
            />
          </FormGroup>

          <hr style={{ background: "black", width: "100%" }} />
          <Typography component="h2">Freelancers needed:</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="freelancers_needed.0"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"0-1"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="1"
            />
            <FormControlLabel
              control={
                <Controller
                  name="freelancers_needed.1"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"2-5"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="2 to 5"
            />
            <FormControlLabel
              control={
                <Controller
                  name="freelancers_needed.2"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"6-"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="More than 5"
            />
            <FormControlLabel
              control={
                <Controller
                  name="freelancers_needed.3"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"0-"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Controller
                  name="freelancers_needed.4"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"0-1"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Single freelancer"
            />
            <FormControlLabel
              control={
                <Controller
                  name="freelancers_needed.5"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"2-"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Multiple freelancer"
            />
          </FormGroup>

          <hr style={{ background: "black", width: "100%" }} />

          <Typography component="h2">Number of Proposals:</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="proposals.0"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"0-4"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Less than 5"
            />
            <FormControlLabel
              control={
                <Controller
                  name="proposals.1"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      value={"5-9"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="5 to 10"
            />
            <FormControlLabel
              control={
                <Controller
                  name="proposals.2"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"10-14"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="10 to 15"
            />
            <FormControlLabel
              control={
                <Controller
                  name="proposals.3"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"15-19"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="15 to 20"
            />
            <FormControlLabel
              control={
                <Controller
                  name="proposals.4"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"20-49"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="20 to 50"
            />
          </FormGroup>
          <hr style={{ background: "black", width: "100%" }} />

          <Typography component="h2">Connect needed:</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="connect_price.0"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"0-2"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="2 or less Connects"
            />
            <FormControlLabel
              control={
                <Controller
                  name="connect_price.1"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"4"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="4 Connects"
            />
            <FormControlLabel
              control={
                <Controller
                  name="connect_price.2"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"6"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="6 Connects"
            />
          </FormGroup>
          <hr style={{ background: "black", width: "100%" }} />

          <Typography component="h2">Job Type:</Typography>

          <FormGroup>
            <div className={styles.hourly}>
              <FormControlLabel
                control={
                  <Controller
                    name="t.0"
                    control={control}
                    render={({ field: {  onChange } }) => (
                      <Checkbox
                        onClick={() => setIsHourly(!isHourly)}
                        value={"0"}
                        onChange={(e) => onChange(falseOrValue(e))}
                      />
                    )}
                  />
                }
                label="Hourly"
              />
              {isHourly ? (
                <>
                  {" "}
                  <Controller
                    name="hourly_rate.0"
                    control={control}
                    render={({ field: {  onChange } }) => (
                      <TextField
                        type="number"
                        className={styles.hourlyInput}
                        size="small"
                        placeholder="$ Min"
                        onChange={(e: any) => onChange(inputHourlyMin(e))}
                      />
                    )}
                  />
                  <Controller
                    name="hourly_rate.0"
                    control={control}
                    render={({ field: {  onChange } }) => (
                      <TextField
                        type="number"
                        className={styles.hourlyInput}
                        size="small"
                        placeholder="$ Max"
                        onChange={(e: any) => onChange(inputHourlyMax(e))}
                      />
                    )}
                  />
                </>
              ) : (
                ""
              )}{" "}
            </div>

            <FormControlLabel
              control={
                <Controller
                  name="t.1"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      onClick={() => setIsFixedPrice(!isFixedPrice)}
                      value={"1"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Fixed-Price"
            />

            {isFixedPrice ? (
              <>
                {" "}
                <FormControlLabel
                  control={
                    <Controller
                      name="amount.0"
                      control={control}
                      render={({ field: {  onChange } }) => (
                        <Checkbox
                          value={"0-99"}
                          onChange={(e) => onChange(falseOrValue(e))}
                        />
                      )}
                    />
                  }
                  label="Less than $100"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="amount.1"
                      control={control}
                      render={({ field: {  onChange } }) => (
                        <Checkbox
                          value={"100-499"}
                          onChange={(e) => onChange(falseOrValue(e))}
                        />
                      )}
                    />
                  }
                  label="$100 to $500"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="amount.2"
                      control={control}
                      render={({ field: {  onChange } }) => (
                        <Checkbox
                          value={"500-999"}
                          onChange={(e) => onChange(falseOrValue(e))}
                        />
                      )}
                    />
                  }
                  label="$500 - $1K"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="amount.3"
                      control={control}
                      render={({ field: {  onChange } }) => (
                        <Checkbox
                          value={"1000-4999"}
                          onChange={(e) => onChange(falseOrValue(e))}
                        />
                      )}
                    />
                  }
                  label="$1K - $5K"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="amount.4"
                      control={control}
                      render={({ field: {  onChange } }) => (
                        <Checkbox
                          value={"5000-"}
                          onChange={(e) => onChange(falseOrValue(e))}
                        />
                      )}
                    />
                  }
                  label="$5K+"
                />
                <div className={styles.hourly}>
                  <FormControlLabel
                    control={<Checkbox checked={isFixedPriceChecked} />}
                    label=""
                  />

                  <Controller
                    name="amount.5"
                    control={control}
                    render={({ field: {  onChange } }) => (
                      <TextField
                        type="number"
                        className={styles.hourlyInput}
                        size="small"
                        placeholder="$ Min"
                        onChange={(e: any) => onChange(inputFixedPriceMin(e))}
                      />
                    )}
                  />
                  <Controller
                    name="amount.5"
                    control={control}
                    render={({ field: {  onChange } }) => (
                      <TextField
                        type="number"
                        className={styles.hourlyInput}
                        size="small"
                        placeholder="$ Max"
                        onChange={(e: any) => onChange(inputFixedPriceMax(e))}
                      />
                    )}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </FormGroup>
          <hr style={{ background: "black", width: "100%" }} />

          <Typography component="h2">Project length:</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="duration_v3.0"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"weeks"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Less than 1 month"
            />
            <FormControlLabel
              control={
                <Controller
                  name="duration_v3.1"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"months"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="1 to 3 month"
            />
            <FormControlLabel
              control={
                <Controller
                  name="duration_v3.2"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"semester"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="3 to 6 month"
            />
            <FormControlLabel
              control={
                <Controller
                  name="duration_v3.3"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"ongoing"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="More than 6 month"
            />
          </FormGroup>

          <hr style={{ background: "black", width: "100%" }} />
          <Typography component="h2">Category:</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.0"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282584862721"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Accounting & Consulting"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.1"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282580668416"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Admin Support"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.2"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282580668417"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Customer Service"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.3"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282580668420"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Data Science & Analytics"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.4"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282580668421"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Design & Creative"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.5"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282584862722"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Engineering & Architecture"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.6"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282580668419"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="IT & Networking"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.7"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282584862723"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Legal"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.8"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282580668422"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Sales & Marketing"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.9"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282584862720"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Translation"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.10"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282580668418"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Web, Mobile & Software Dev"
            />
            <FormControlLabel
              control={
                <Controller
                  name="category2_uid.11"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <Checkbox
                      value={"531770282580668423"}
                      onChange={(e) => onChange(falseOrValue(e))}
                    />
                  )}
                />
              }
              label="Writing"
            />
          </FormGroup>
          <Typography component="h2">Location:</Typography>

          <Controller
            name="location"
            control={control}
            render={({ field: {  onChange } }) => (
              <Autocomplete
                onChange={(e, data) => onChange(locationData(data))}
                value={isLocationData}
                disablePortal
                multiple
                size="small"
                id="combo-box-demo"
                options={location.location.options}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          />

          <Typography component="h2">Client time zones:</Typography>

          <Controller
            name="timezones"
            control={control}
            render={({ field: { onChange } }) => (
              <Autocomplete
                onChange={(e, data) => onChange(data.map((e: any) => e.value))}
                disablePortal
                multiple
                size="small"
                id="combo-box-demo"
                options={timezone.timezones.options}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          />
        </div>
        <div className={styles.fixed_modal_footer}>
          <Typography component="h2">Sorting:</Typography>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
              <Controller
                name="sorting"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sorting"
                    className={styles.selectInput}
                    error={!!errors.sorting}
                    size="medium"
                    {...field}
                  >
                    <MenuItem value={"recency"}>Newest</MenuItem>
                    <MenuItem value={"relevance"}>Relevance</MenuItem>
                    <MenuItem value={"client_rating"}>Client rating</MenuItem>
                    <MenuItem value={"client_total_change"}>
                      Client spend
                    </MenuItem>
                  </Select>
                )}
              />
              <FormHelperText
                style={{ background: "#e5f4ff", margin: "0", color: "#d32f2f" }}
              >
                {errors.sorting?.message}
              </FormHelperText>
            </FormControl>
          </Box>
          <div className={styles.footer_buttons}>
            <Button variant="contained" onClick={clickHandlerForCloseModal}>
              Close
            </Button>
            <Button variant="contained" onSubmit={submitForm} type="submit">
              Add
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default WorkerForm;
