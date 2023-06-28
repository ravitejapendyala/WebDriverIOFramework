
export class frameworkhelpers {

    public ExtractJsonData(JsonKey1: string, JsonKey2?: string) {
        if (JsonKey2 != undefined) {
            const fs = require('fs');
            let RawData = fs.readFileSync('src/test-data/Test.json');
            var testData = JSON.parse(RawData);
            var result = testData[JsonKey1][JsonKey2];
            console.log(result);
        }
        else {
            const fs = require('fs');
            let RawData = fs.readFileSync('src/test-data/Test.json');
            var testData = JSON.parse(RawData);
            var result = testData[JsonKey1];
            console.log(result);
        }
        return result;
    }


    public GenerateRandomText(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    public GenerateRandomNumber(length) {
        var result = '';
        var characters = '0123456789123456';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return parseInt(result);
    }

    async WaitForPageToLoad() {
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete')),
        {
            timeout: 60 * 3000, // 60 seconds
            timeoutMsg: 'Message on failure'
        }
    }
    async GenericListDropDownValues(elements) {
        var list: string[] = [];
        for (var i = 0; i < elements.length; i++) {
            const Text = await elements[i].getText();
            await list.push(Text)
        }
        return list
    }
    async isEqual(value1, value2) {
        const length = value1.length;
        for (let i = 0; i < length; i++) {
            if (value1[i] === value2[i]) {
                return true
            }
            else {
                return false
            }

        }

    }
    async IsEqual(value1, value2) {
        const length = value1.length;
        var flag = true;
        for (let i = 0; i < length; i++) {
            if (Boolean(value1[i]) === false) {
                if (Boolean(value2[length - 1 - i]) === false) {
                    flag = true
                }
                else {
                    flag = false
                    break
                }
            }
            else if (value1[i] === value2[length - 1 - i]) {
                flag = true
            }
            else {
                flag = false;
                break
            }
        }
        return flag
    }
    async genericAutoDrpDwn(elements, value: string) {
        await browser.pause(1000);
        for (var i = 0; i < elements.length; i++) {
            const Text = await elements[i].getText();
            if (Text == value) {
                try {
                    await elements[i].click();
                } catch {
                    await browser.execute("arguments[0].click();", elements[i]);
                }
                break;
            }
        }

    }

    get NoRecordsSpan() {
        return $('//*[@id="baseTable"]/div/div/div/div/div/table/tbody/tr/td');
    }

    async genericAutoDrpDwnContents(elements) {
        const eleList = [];
        await browser.pause(1000);
        for (var i = 0; i < elements.length; i++) {
            const text: any = await elements[i].getText();
            eleList.push(text);
        }
        return eleList;
    }

    async genericAutoDrpDwnUsingJavascriptClick(elements, value: string) {
        await browser.pause(1000);
        for (var i = 0; i < elements.length; i++) {
            const Text = await elements[i].getText();
            if (Text == value) {
                try {
                    await this.JavaScriptClick(await elements[i]);
                } catch {
                    await browser.execute("arguments[0].click();", elements[i]);
                }
                break;
            }
        }

    }
    async ClearValue(elements, Value: string) {
        for (let i = 0; i < Value.length + 1; i++) {
            await elements.setValue("Backspace")
        }
    }
    async Click(elements) {
        await elements.waitForClickable()
        await elements.click();
    }
    async NonclickableClicks(elements) {
        await elements.waitForExist();
        await elements.click();
    }
    async GetText(elements) {
        await elements.waitForEnabled();
        const text = await elements.getText();
        return text
    }
    async sendKeys(elements, text: any) {
        await elements.waitForEnabled();
        const Value = await elements.getValue();
        await this.ClearValue(elements, Value);
        await elements.setValue(text);
    }
    async WaitForDisplayed(elements) {
        await elements.waitForDisplayed();
    }
    async WaitForEnabled(elements) {
        await elements.waitForEnabled();
    }
    async WaitForExist(element) {
        await element.waitForExist();
    }
    get StatusMssgElement() {
        return $('//*[@id="notistack-snackbar"]/div/div');
    }
    get StatusMessage() {

        browser.waitUntil(
            () => {
                let element = $('//*[@id="notistack-snackbar"]/div/div');
                return ((element.isExisting() || element.isDisplayed()) && (element.getText() != ""))
            }, 10000, 'Notification bar should be displayed within 20s', 20
        );
        let StatusMsg = $('//*[@id="notistack-snackbar"]/div/div');
        return StatusMsg.getText();
    }
    async IsDisplayed(elements) {
        try {
            await elements.waitForDisplayed({ timeout: 2000 })
        }
        catch { }
        if (await elements.isDisplayed() == true) {
            return true
        }
        else {
            return false
        }
    }
    async MoveTo(elements) {
        await elements.waitForEnabled();
        await elements.moveTo();
    }
    async GetValue(elements) {
        await elements.waitForEnabled();
        const value = await elements.getValue();
        return value
    }
    async IsEnabled(elements) {
        await elements.waitForDisplayed();
        if (await elements.isEnabled() == true) {
            return true
        }
        else {
            return false
        }

    }
    async GetAttribute(elements, value: string) {
        await elements.waitForEnabled();
        const Value = await elements.getAttribute(value);
        return Value
    }
    async FieldNames(index: Number) {
        return $$('//tr[@class="MuiTableRow-root MuiTableRow-hover"]//td[' + index + '+1]')
    }
    async VerifySorting(ElementsInHeader, elementsInGrid) {
        const Length = ElementsInHeader.length - elementsInGrid.length;
        var list: Number[] = [];
        for (let i = 0; i < elementsInGrid.length; i++) {
            const value = Length + i
            list.push(value);
        }
        var flag = true;
        for (let i = 0; i < elementsInGrid.length; i++) {
            const index = await list[i];
            const value = await elementsInGrid[i].getAttribute('aria-sort');
            if (value == 'none') {
                await elementsInGrid[i].click();
                if (await elementsInGrid[i].getAttribute('aria-sort') == 'Ascendant') {
                    const FieldNameAsc = await this.GenericListDropDownValues(await this.FieldNames(index));
                    await elementsInGrid[i].click();
                    const FieldNameDsc = await this.GenericListDropDownValues(await this.FieldNames(index));
                    if (await this.IsEqual(FieldNameAsc, FieldNameDsc)) {
                        flag = true
                    }
                    else {
                        flag = false
                    }
                }
                else if (await elementsInGrid[i].getAttribute('aria-sort') == 'Descendant') {
                    await elementsInGrid[i].click();
                    await elementsInGrid[i].click();
                    const FieldNameAsc = await this.GenericListDropDownValues(await this.FieldNames(index));
                    await elementsInGrid[i].click();
                    const FieldNameDsc = await this.GenericListDropDownValues(await this.FieldNames(index));
                    if (await this.IsEqual(FieldNameAsc, FieldNameDsc)) {
                        flag = true
                    }
                    else {
                        flag = false
                    }
                }
            }
        }
        return flag
    }

    async handleProgressBar() {
        const ele = await $('//*[@role="progressbar"]');
        try {
            await ele.waitForDisplayed({ timeout: 4000 });
            await ele.waitForDisplayed({ reverse: true });
        } catch {
            browser.pause(3000);
        }

    }
    async handleStackMessage() {
        const ele = await $('//div[@aria-describedby="notistack-snackbar"]');
        try {
            await ele.waitForDisplayed({ timeout: 3000 });
            await ele.waitForDisplayed({ reverse: true });
        } catch {
            browser.pause(3000);
        }


    }
    async TodayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var TodayDate = mm + '/' + dd + '/' + yyyy;
        return TodayDate
    }
    async getTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1)
        var month = tomorrow.getMonth() + 1;
        var year = tomorrow.getFullYear();
        var day = tomorrow.getDate();
        if (day < 10 && month < 10) {
            var tomorrowDate = "0" + month + "/" + "0" + day + "/" + year;
        }
        else if (day < 10 && month > 10) {
            var tomorrowDate = month + "/" + "0" + day + "/" + year;

        }
        else if (day > 10 && month < 10) {
            var tomorrowDate = "0" + month + "/" + day + "/" + year;

        }
        else if (day == 10 && month < 10) {
            var tomorrowDate = "0" + month + "/" + day + "/" + year;

        }

        else {
            var tomorrowDate = month + "/" + day + "/" + year;
        }
        return tomorrowDate
    }

    public FactUpload(FactDataCSVpath: string) {
        var exec = require('child_process').execFile;

        var opt = function () {
            const currentWorkDirectory = process.cwd();
            exec(currentWorkDirectory + "\\src\\FactUploadData\\FactUploadFileCMD.exe", [FactDataCSVpath], function (err, data) {
                console.log(err)
                console.log(data.toString());
            });
        }
        opt();
    }

    public BuildCsvPath(csvFileName: string, factUploadDataPath: string) {
        const currentWorkDirectory = process.cwd();
        let path = currentWorkDirectory + factUploadDataPath + csvFileName;
        return path;
    }
    async VerifyAscendingOrder(element, Value: string) {
        let value = await this.GetAttribute(await element, Value)
        if (value == 'none') {
            await this.Click(await element);
        }
        else if (value == 'Descendant') {
            await this.Click(await element);
            let value = await this.GetAttribute(await element, Value)
            if (value == 'Descendant') {
                await this.Click(await element);
            }
        }
    }
    async VerifyDescendingOrder(element, Value: string) {
        await this.Click(await element);
        const value = await this.GetAttribute(await element, Value)
        if (value == 'none') {
            await this.Click(await element);
            await this.Click(await element);
        }
        else if (value == 'Ascendant') {
            await this.Click(await element);
        }
    }
    async JavaScriptClick(element) {
        await browser.execute("arguments[0].click();", element);
    }
    async VerifyText(text: string) {
        return $('(//*[text()="' + text + '"])[1]')
    }

    async GetElementByText(text: string) {
        return $('//*[text()="' + text + '"]')
    }

    async TextIncludes(sourceText: string, textToCheck: string) {
        return sourceText.includes(textToCheck)
    }
    async GetCSSProperty(element, attribute: any) {
        const value = await element.getCSSProperty(attribute);
        return value

    }
    async ClickRequiredBtn(Name: string) {
        await this.Click(await $('//*[@id="' + Name + '"]'))
    }
    async ListIncludes(listItems: string[], item: string) {

        const exists = listItems?.find((el: any) => {
            return el === item
        }) !== undefined;
        return exists;

    }
    async VerifyDuplicates(Values: Array<string>, Value: any) {
        let count = 0;
        for (let i = 0; i < Values.length; i++) {
            if (Values[i] == Value) {
                count++;
            }
        }
        if (count == 1) {
            return true
        } else { return false }

    }
    async compareListAndValue(list1, Value) {
        let flag;
        for (let value of list1) {
            if (value == Value) {
                flag = true;
            } else { flag = false }
            return flag;
        }

    }
    async GetYesterDate() {
        var today = new Date();
        var yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        var dd = yesterday.getDate();
        var mm = yesterday.getMonth() + 1;
        var yyyy = yesterday.getFullYear();
        var yesterday_date = mm + '/' + dd + '/' + yyyy;
        return yesterday_date

    }
    async VerifyDateFormat(testDate: string) {
        var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        if (!(date_regex.test(testDate))) {
            return true;
        }
        else {
            return false
        }
    }
    async ListContains(list: string[], element: string) {
        let flag;
        if (list.includes(element)) { flag = true }
        else { flag = false }
        return flag
    }

    async ClearTextAndEnterText(element: any) {
        await this.Click(await element);
        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');
    }

    async CloseCustomDropDown(Id: any, value1: number, value2: number) {
        try {
            await Id.click({
                x: value1,
                y: value2
            });
        } catch {
            await Id.click({
                x: value1,
                y: value2
            });

        }
    }
    async waitForStackBarMassage() {
        await $('//div[@id="notistack-snackbar"]/div/div').waitForExist();
    }

    async inRange(value: number, min: number, max: number) {
        let flag;
        flag = value >= min && value <= max;
        return flag;
    }
}