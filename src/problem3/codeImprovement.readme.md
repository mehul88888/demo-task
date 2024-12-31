# Refactored code

```typescript
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    // Priority calculation using a map for quick lookup
    const blockchainPriorities = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
  
    const getPriority = (blockchain: string): number => {
      return blockchainPriorities[blockchain] || -99; // default to -99 if not found
    };
  
    const sortedBalances = useMemo(() => {
      return balances
        .filter((balance) => {
          const priority = getPriority(balance.blockchain);
          return priority > -99 && balance.amount > 0;
        })
        .map((balance) => {
            const priority = getPriority(balance.blockchain);
            const formattedAmount = balance.amount.toFixed(2); // Format amount to 2 decimal places
            return { ...balance, priority, formatted: formattedAmount };
          })
        .sort((lhs, rhs) => rhs.priority - lhs.priority); // Sorting based on priority
    }, [balances]);
  
    // Use useMemo to avoid recalculating rows on each render
    const rows = useMemo(() => {
      return sortedBalances.map((balance:FormattedWalletBalance) => {
        const usdValue = prices[balance.currency] * balance.amount;// Calculate USD value
        return (
          <WalletRow
            className={classes.row}
            key={balance.currency} // Use unique key based on currency
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted} // Use the preformatted amount
          />
        );
      });
    }, [sortedBalances, prices]);
  
    return (
      // Render rows inside a container
      <div {...rest}>
        {rows}
      </div>
    );
  };
  ```


&nbsp;


#  **Refactored Code Improvements**

1. **Efficient Priority Lookup**: Replaced the `switch` statement with a `blockchainPriorities` map for fast and maintainable O(1) lookups.  
2. **Correct Filtering**: Ensured filtering excludes balances with `amount <= 0` or unknown blockchains by validating priorities correctly.  
3. **Integrated Mapping and Sorting**: Combined priority calculation, formatting, and sorting into a single operation to reduce redundant iterations.  
4. **Optimized Dependencies**: Adjusted `useMemo` dependencies to include only `balances` for recalculation, avoiding unnecessary updates.  
5. **Proper Key Management**: Used `currency` as the unique key for rows, ensuring React can handle re-renders correctly.  
6. **Streamlined Logic**: Removed duplicated operations, improved readability, and reduced complexity by consolidating formatting and row rendering logic.  