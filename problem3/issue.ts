import { useMemo } from "react";
// Cause using useMemo but root version not import

interface WalletBalance {
  currency: string;
  amount: number;

  // blockchain properties is in-use at sortedBalances but not declare in WalletBalance so i add it
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;

  // Cause FormattedWalletBalance is inheritance from WalletBalance so i also add blockchain properties for preventing bugs
  blockchain: string;
}

interface Props extends BoxProps {}

/*
const getPriority = (blockchain: any): number => {
-----
I see all the cases in switch are string type, so i change the params type to string for clearly implementation
*/
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);

        /*
        if (lhsPriority  > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
        -----
        The original version, lhsPriority is not declared so i think that is balancePriority cause it has declared but unused
        We can use ternary operator for shortly version of these code
        */
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        /*
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        ------
        We can use ternary operator for shortly version of these code
          */
        return leftPriority > rightPriority ? -1 : 1;
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(), //
    };
  });

  /*
  const rows = sortedBalances.map(
  -----
  The formattedBalances in root version has declared but unuse, and the rows return using formatted properties of formattedBalances
  So i change sortedBalances to formattedBalances
  */
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
