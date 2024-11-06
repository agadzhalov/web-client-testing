import {
    AccountId,
    PrivateKey,
    Logger,
    LogLevel,
    AccountBalanceQuery,
    WebClient
  } from "@hashgraph/sdk";
  
  async function main() {

    const nodesConfig = [
        {
            accountId: 5,
            host: 'https://testnet-node02-00-grpc.hedera.com:443',

        },
    ];

    const webNetworkMap = {};
        nodesConfig.forEach(node => {
        webNetworkMap[`${node.host}`] = AccountId.fromString(node.accountId.toString());
    });

    const operatorId = AccountId.fromString("YOUR_OPERATOR_KEY");
    const operatorKey = PrivateKey.fromStringECDSA(
      "YOUR_PRIVATE_KEY"
    );
    const client = await WebClient.forNetwork(webNetworkMap);
    client.setOperator(operatorId, operatorKey);
    const infoLogger = new Logger(LogLevel.Debug);
    client.setLogger(infoLogger);
    const newAccountId = new AccountId(2672318);
  
    const balance = await new AccountBalanceQuery()
            .setAccountId(operatorId)
            .execute(client);

    console.log(`balance = ${balance.hbars.toString()}`);
  }
  void main();
  