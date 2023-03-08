import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import styles from "../../../styles/dashboard/dashboard.module.css";
import location from "../../../assets/json/locations.json";
import timezone from "../../../assets/json/timezones.json";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { schemaWorker } from "../../schemas/Schema";
import { dataOptions } from "../../../assets/dataForWorkerFormCheckboxes/dataForWorkerForm";
import {
  IDataForCheckboxes,
  ILocations,
  ITimezones,
  IUpworkAccountsUsersInfo,
  IWorkerData,
  IWorkerFormProps
} from "../../../interfaces/workerFormInterfaces";

const WorkerForm = ({
  clickHandlerForCloseModal,
  submitForm,
  upworkAccounts,
}: IWorkerFormProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLocationData, setIsLocationData] = useState<any[]>([]);
  const [isHourly, setIsHourly] = useState<boolean>(false);
  const [isFixedPrice, setIsFixedPrice] = useState<boolean>(false);
  const [hourlyNumberMin, setHourlyNumberMin] = useState<string>("");
  const [hourlyNumberMax, setHourlyNumberMax] = useState<string>("");
  const [FixedPriceNumberMin, setFixedPriceNumberMin] = useState<string>("");
  const [FixedPriceNumberMax, setFixedPriceNumberMax] = useState<string>("");
  const [isFixedPriceChecked, setIsFixedPriceChecked] = useState<boolean>(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IWorkerData>({
    defaultValues: {
      enableScoring: new Array(1).fill(false),
      title: "",
      description: "",
      q: "",
      contractor_tier:  new Array(3).fill(false),
      previous_clients: new Array(1).fill(false),
      payment_verified: new Array(1).fill(false),
      client_hires:  new Array(3).fill(false),
      workload:  new Array(2).fill(false),
      freelancers_needed:  new Array(6).fill(false),
      proposals:  new Array(5).fill(false),
      connect_price:  new Array(3).fill(false),
      duration_v3: new Array(4).fill(false),
      category2_uid:  new Array(12).fill(false),
      user_location_match: [2],
      location: "",
      timezones: "",
      t:  new Array(2).fill(false),
      amount: new Array(6).fill(false),
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
  }

  useEffect(() => {
    if (!isHourly) {
      setValue("hourly_rate.0", false);
    }
    if (!isFixedPrice) {
      setValue("amount",  new Array(6).fill(false),);
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
  }

  function inputHourlyMax(e: React.ChangeEvent<HTMLInputElement>) {
    let str: string | any;
    setHourlyNumberMax(e.target.value);
    str = hourlyNumberMin + "-" + e.target.value;
    return str;
  }

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

  function locationData(data: ILocations[]) {
    setIsChecked(false);
    setIsLocationData(data);
    setValue("user_location_match.0", "2");
    let result: string[] = [];
    data.map((e: ILocations) => {
      result.push(e.value);
    });
    return result;
  }

  return (
    <>
      <Typography variant="h5" component="h4">
        Add worker
      </Typography>
      <form
        onSubmit={handleSubmit((data: IWorkerData) => {
          submitForm(data);
        })}
      >
        <div className={styles.workerForm_inputs_selects}>
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
                    {upworkAccounts.map((option: IUpworkAccountsUsersInfo) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
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

        <div className={styles.workerForm_options}>
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
                      value="1"
                      checked={isChecked}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(onOrOff(e))
                      }
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
            {dataOptions.experienceLevel.map((elem: IDataForCheckboxes) => {
              return (
                <FormControlLabel
                    key={elem.value}
                  label={elem.label}
                  control={
                    <Controller
                      name={elem.name}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          value={elem.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(falseOrValue(e))
                          }
                        />
                      )}
                    />
                  }
                />
              );
            })}
          </FormGroup>

          <hr/>

          <Typography component="h2">Client info:</Typography>

          <FormGroup>
            {dataOptions.clientInfo.map((elem: IDataForCheckboxes) => {
              return (
                <FormControlLabel
                    key={elem.value}
                  label={elem.label}
                  control={
                    <Controller
                      name={elem.name}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          value={elem.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(falseOrValue(e))
                          }
                        />
                      )}
                    />
                  }
                />
              );
            })}
          </FormGroup>

          <hr/>

          <Typography component="h2">Client history:</Typography>
          <FormGroup>
            {dataOptions.clientHistory.map((elem: IDataForCheckboxes) => {
              return (
                <FormControlLabel
                    key={elem.value}
                  label={elem.label}
                  control={
                    <Controller
                      name={elem.name}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          value={elem.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(falseOrValue(e))
                          }
                        />
                      )}
                    />
                  }
                />
              );
            })}
          </FormGroup>

          <hr/>

          <Typography component="h2">Hours per week:</Typography>

          <FormGroup>
            {dataOptions.hoursPerWeek.map((elem: IDataForCheckboxes) => {
              return (
                <FormControlLabel
                    key={elem.value}
                  label={elem.label}
                  control={
                    <Controller
                      name={elem.name}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          value={elem.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(falseOrValue(e))
                          }
                        />
                      )}
                    />
                  }
                />
              );
            })}
          </FormGroup>
          <hr/>

          <Typography component="h2">Freelancers needed:</Typography>

          <FormGroup>
            {dataOptions.freelancerNeeded.map((elem: IDataForCheckboxes) => {
              return (
                <FormControlLabel
                    key={elem.value}
                  label={elem.label}
                  control={
                    <Controller
                      name={elem.name}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          value={elem.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(falseOrValue(e))
                          }
                        />
                      )}
                    />
                  }
                />
              );
            })}
          </FormGroup>

          <hr/>

          <Typography component="h2">Number of Proposals:</Typography>

          <FormGroup>
            {dataOptions.numberOfProposals.map((elem: IDataForCheckboxes) => {
              return (
                <FormControlLabel
                    key={elem.value}
                  label={elem.label}
                  control={
                    <Controller
                      name={elem.name}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          value={elem.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(falseOrValue(e))
                          }
                        />
                      )}
                    />
                  }
                />
              );
            })}
          </FormGroup>

          <hr/>

          <Typography component="h2">Connect needed:</Typography>

          <FormGroup>
            {dataOptions.connectNeeded.map((elem: IDataForCheckboxes) => {
              return (
                <FormControlLabel
                    key={elem.value}
                  label={elem.label}
                  control={
                    <Controller
                      name={elem.name}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          value={elem.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(falseOrValue(e))
                          }
                        />
                      )}
                    />
                  }
                />
              );
            })}
          </FormGroup>

          <hr/>

          <Typography component="h2">Job Type:</Typography>

          <FormGroup>
            <div className={styles.hourly}>
              <FormControlLabel
                control={
                  <Controller
                    name="t.0"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Checkbox
                        onClick={() => setIsHourly(!isHourly)}
                        value="0"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onChange(falseOrValue(e))
                        }
                      />
                    )}
                  />
                }
                label="Hourly"
              />
              {isHourly ? (
                <>
                  {dataOptions.isHourly.map((elem: IDataForCheckboxes) => {
                    return (
                      <Controller
                          key={elem.placeholder+"1"}
                        name="hourly_rate.0"
                        control={control}
                        render={({ field: { onChange } }) => (
                          <TextField
                            type="number"
                            className={styles.hourly_input}
                            size="small"
                            placeholder={elem.placeholder}
                            onChange={
                              elem.placeholder === "$ Min"
                                ? (e: React.ChangeEvent<HTMLInputElement>) =>
                                    onChange(inputHourlyMin(e))
                                : (e: React.ChangeEvent<HTMLInputElement>) =>
                                    onChange(inputHourlyMax(e))
                            }
                          />
                        )}
                      />
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </div>

            <FormControlLabel
              control={
                <Controller
                  name="t.1"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      onClick={() => setIsFixedPrice(!isFixedPrice)}
                      value="1"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(falseOrValue(e))
                      }
                    />
                  )}
                />
              }
              label="Fixed-Price"
            />

            {isFixedPrice ? (
              <>
                {dataOptions.isFixedPrice.map((elem:  IDataForCheckboxes) => {
                  return (
                    <FormControlLabel
                        key={elem.value}
                      label={elem.label}
                      control={
                        <Controller
                          name={elem.name}
                          control={control}
                          render={({ field: { onChange } }) => (
                            <Checkbox
                              value={elem.value}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => onChange(falseOrValue(e))}
                            />
                          )}
                        />
                      }
                    />
                  );
                })}

                <div className={styles.hourly}>
                  <FormControlLabel
                    control={<Checkbox checked={isFixedPriceChecked} />}
                    label=""
                  />
                  {dataOptions.isHourly.map((elem:  IDataForCheckboxes) => {
                    return (
                      <>
                        <Controller
                            key={elem.placeholder}
                          name="amount.5"
                          control={control}
                          render={({ field: { onChange } }) => (
                            <TextField
                              type="number"
                              className={styles.hourly_input}
                              size="small"
                              placeholder={elem.placeholder}
                              onChange={
                                elem.placeholder === "$ Min"
                                  ? (e: React.ChangeEvent<HTMLInputElement>) =>
                                      onChange(inputFixedPriceMin(e))
                                  : (e: React.ChangeEvent<HTMLInputElement>) =>
                                      onChange(inputFixedPriceMax(e))
                              }
                            />
                          )}
                        />
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              ""
            )}
          </FormGroup>

          <hr/>

          <Typography component="h2">Project length:</Typography>

          <FormGroup>
            {dataOptions.projectLength.map((elem:  IDataForCheckboxes) => {
              return (
                <FormControlLabel
                    key={elem.value}
                  label={elem.label}
                  control={
                    <Controller
                      name={elem.name}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          value={elem.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(falseOrValue(e))
                          }
                        />
                      )}
                    />
                  }
                />
              );
            })}
          </FormGroup>

          <hr/>
          <Typography component="h2">Category:</Typography>

          <FormGroup>
            {dataOptions.category.map((elem:  IDataForCheckboxes) => {
              return (
                <FormControlLabel
                    key={elem.value}
                  label={elem.label}
                  control={
                    <Controller
                      name={elem.name}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          value={elem.value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(falseOrValue(e))
                          }
                        />
                      )}
                    />
                  }
                />
              );
            })}
          </FormGroup>
          <Typography component="h2">Location:</Typography>

          <Controller
            name="location"
            control={control}
            render={({ field: { onChange } }) => (
              <Autocomplete
                onChange={(e: React.SyntheticEvent, data: ILocations[]) =>
                  onChange(locationData(data))
                }
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
                onChange={(e: React.SyntheticEvent, data: ITimezones[]) =>
                  onChange(data.map((elem: ITimezones) => elem.value))
                }
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
        <div className={styles.workerForm_footer}>
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
                    className={styles.sorting_select}
                    error={!!errors.sorting}
                    size="medium"
                    {...field}
                  >
                    <MenuItem value="recency">Newest</MenuItem>
                    <MenuItem value="relevance">Relevance</MenuItem>
                    <MenuItem value="client_rating">Client rating</MenuItem>
                    <MenuItem value="client_total_change">
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
          <div className={styles.workerForm_footer_buttons}>
            <Button variant="contained" onClick={clickHandlerForCloseModal}>
              Close
            </Button>
            <Button
              variant="contained"
              onSubmit={() => submitForm}
              type="submit"
            >
              Add
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default WorkerForm;
