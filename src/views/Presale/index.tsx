import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  InputAdornment,
  OutlinedInput,
  Zoom,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
} from "@material-ui/core";
import RebaseTimer from "../../components/RebaseTimer";
import { trim } from "../../helpers";
import { changeStake, changeApproval } from "../../store/slices/stake-thunk";
import "./presale.scss";
import { useWeb3Context } from "../../hooks";
import {
  IPendingTxn,
  isPendingTxn,
  txnButtonText,
} from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";

function Presale() {
  const dispatch = useDispatch();
  const { provider, address, connect, chainID, checkWrongNetwork } =
    useWeb3Context();

  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState<string>("");

  const isAppLoading = useSelector<IReduxState, boolean>(
    (state) => state.app.loading
  );
  const currentIndex = useSelector<IReduxState, string>((state) => {
    return state.app.currentIndex;
  });
  const fiveDayRate = useSelector<IReduxState, number>((state) => {
    return state.app.fiveDayRate;
  });
  const sbBalance = useSelector<IReduxState, string>((state) => {
    return state.account.balances && state.account.balances.sb;
  });
  const ssbBalance = useSelector<IReduxState, string>((state) => {
    return state.account.balances && state.account.balances.ssb;
  });
  const aKNOXBalance = useSelector<IReduxState, string>((state) => {
    return state.account.balances && state.account.balances.aKNOX;
  });
  const MIMBalance = useSelector<IReduxState, string>((state) => {
    return state.account.balances && state.account.balances.MIM;
  });
  const stakeAllowance = useSelector<IReduxState, number>((state) => {
    return state.account.staking && state.account.staking.sb;
  });
  const unstakeAllowance = useSelector<IReduxState, number>((state) => {
    return state.account.staking && state.account.staking.ssb;
  });
  const stakingRebase = useSelector<IReduxState, number>((state) => {
    return state.app.stakingRebase;
  });
  const stakingAPY = useSelector<IReduxState, number>((state) => {
    return state.app.stakingAPY;
  });
  const stakingTVL = useSelector<IReduxState, number>((state) => {
    return state.app.stakingTVL;
  });

  const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(
    (state) => {
      return state.pendingTransactions;
    }
  );

  const setMax = () => {
    if (view === 0) {
      setQuantity(parseInt(MIMBalance) >= 1500 ? "1500" : MIMBalance);
    } else {
      setQuantity(ssbBalance);
    }
  };

  const onSeekApproval = async (token: string) => {
    if (await checkWrongNetwork()) {
      console.log("checkwrongnetwork");
      return;
    }

    await dispatch(
      changeApproval({ address, token, provider, networkID: chainID })
    );
  };

  const onChangeStake = async (action: string) => {
    if (await checkWrongNetwork()) return;
    if (quantity === "" || parseFloat(quantity) === 0) {
      dispatch(
        warning({
          text: action === "buy" ? messages.no_amount : messages.before_unstake,
        })
      );
    } else {
      console.log("teeest");
      await dispatch(
        changeStake({
          address,
          action,
          value: String(quantity),
          provider,
          networkID: chainID,
        })
      );
      setQuantity("");
    }
  };

  const hasAllowance = useCallback(
    (token) => {
      if (token === "sb") return stakeAllowance > 0;
      if (token === "ssb") return unstakeAllowance > 0;
      if (token === "aKNOX") return 1;
      return 0;
    },
    [stakeAllowance]
  );

  const changeView = (newView: number) => () => {
    setView(newView);
    setQuantity("");
  };

  const trimmedMemoBalance = trim(Number(ssbBalance), 6);
  const trimmedStakingAPY = trim(stakingAPY * 100, 1);
  const stakingRebasePercentage = trim(stakingRebase * 100, 4);

  const [isApproved, setIsApproved] = useState<boolean>(false);

  return (
    <div className="presale-view">
      <Zoom in={true}>
        <Box className={`presale-card`}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <div className="card-header">
                <Typography variant="h5">Presale Rules</Typography>
              </div>
            </Grid>

            <Grid item>
              <div className="stake-top-metrics">
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="column"
                  justifyContent="flex-start"
                >
                  <Grid item style={{ width: "100%" }} xs={12}>
                    <div className="presale-stack">
                      <Typography variant="h5" color="textSecondary">
                        Token will be sent to presale participants on launch day
                      </Typography>
                      <Typography variant="h5"></Typography>
                    </div>
                  </Grid>

                  <Grid item style={{ width: "100%" }} xs={12}>
                    <div className="presale-stack">
                      <Typography variant="h5" color="textSecondary">
                        Maximum Participants
                      </Typography>
                      <Typography variant="h5">50</Typography>
                    </div>
                  </Grid>

                  <Grid item style={{ width: "100%" }} xs={12}>
                    <div className="presale-stack">
                      <Typography variant="h5" color="textSecondary">
                        Maximum Allocation
                      </Typography>
                      <Typography variant="h5">$ 1500 in MIM</Typography>
                    </div>
                  </Grid>

                  <Grid item style={{ width: "100%" }} xs={12}>
                    <div className="presale-stack">
                      <Typography variant="h5" color="textSecondary">
                        Vesting
                      </Typography>
                      <Typography variant="h5">
                        20% release on the day of the launch then 8% per day
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Zoom>
      <Zoom in={true}>
        <Box className={`presale-card`}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <div className="card-header">
                <Typography variant="h5">Get Your Whitelist Tokens</Typography>
              </div>
            </Grid>

            <Grid item>
              <div className="card-header">
                <Typography variant="h6">Buy with MIM</Typography>
              </div>
            </Grid>

            <div className="presale-stack">
              <OutlinedInput
                type="number"
                style={{ width: "75%", marginRight: "5px" }}
                placeholder="Amount"
                className="stake-card-action-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                labelWidth={0}
                endAdornment={
                  <InputAdornment position="end">
                    <div
                      onClick={setMax}
                      className="stake-card-action-input-btn"
                    >
                      <p>Max</p>
                    </div>
                  </InputAdornment>
                }
              />
              {address && hasAllowance("aKNOX") ? (
                <Grid item style={{ width: "25%" }}>
                  <Button
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    className="buy-presale"
                    variant="outlined"
                    onClick={() => {
                      if (isPendingTxn(pendingTransactions, "buy")) {
                        console.log("buy");
                        return;
                      }
                      onChangeStake("buy");
                    }}
                  >
                    Buy
                  </Button>
                </Grid>
              ) : (
                <Grid item style={{ width: "25%" }}>
                  <Button
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    className="buy-presale"
                    variant="outlined"
                    onClick={() => {
                      if (
                        isPendingTxn(pendingTransactions, "approve_staking")
                      ) {
                        console.log("inif");
                        return;
                      }
                      onSeekApproval("aKNOX");
                    }}
                  >
                    Approve
                  </Button>
                </Grid>
              )}
            </div>

            {/*<Grid item>
              <div className="stake-top-metrics">
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="flex-start"
                >
                  <Grid item xs={12} direction="column">
                    <div className="presale-apy">
                      <Typography variant="h5" color="textSecondary">
                        aKNOX currently vesting
                      </Typography>
                      <div className="presale-stack">
                        <Typography variant="h5">0</Typography>
                        <Typography variant="h5">Max</Typography>
                      </div>
                      <Typography variant="h6">You have 0 aKNOX</Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} direction="column">
                    <div className="presale-tvl">
                      <Typography variant="h5" color="textSecondary">
                        Knox currently redeemable
                      </Typography>
                      <div className="presale-stack">
                        <Typography variant="h5">0</Typography>
                        <Typography variant="h5">Max</Typography>
                      </div>
                      <Typography variant="h6">You have 0 aKNOX</Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} direction="column">
                    <div className="presale-index">
                      <Button
                        variant="contained"
                        color="primary"
                        className="connect-button"
                        onClick={connect}
                        key={1}
                      >
                        Approve aKNOX
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>*/}
          </Grid>
        </Box>
      </Zoom>
    </div>
  );
}

export default Presale;
