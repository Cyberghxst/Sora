module.exports = {
    type: 'ready',
    code: `
        $c[Set the client status.]
        $jsonLoad[clientStatuses;$readFile[./handlers/status.json;utf-8]]
        $setInterval[
            $let[randomIndex;$arrayRandomIndex[clientStatuses]]
            $setStatus[online;Custom;$arrayAt[$get[randomIndex]]]
        ;$sum[$multi[60;1000];$multi[30;1000]]]

        $c[Ready message.]
        $logger[Info;$username[$clientID] is ready and connected to the Discord gateway.]
    `
}