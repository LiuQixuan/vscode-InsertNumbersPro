/////<reference path="./sprintf.js" />

'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import cstr, { numToChinanumerals } from './constString'
import { FString } from './FString'

interface IInsertSettngs {
    formatStr: string;
    start: number;
    step: number;
    isChineseNumFormOne: boolean;
}

export class InsertSettngs implements IInsertSettngs {

    public formatStr: string;
    public start: number;
    public step: number;
    public isChineseNumFormOne: boolean;
    private _disposable: vscode.Disposable;

    constructor() {
        let subscriptions: vscode.Disposable[] = [];
        vscode.workspace.onDidChangeConfiguration(this.updateSettings, this, subscriptions);
        this._disposable = vscode.Disposable.from(...subscriptions);

        this.updateSettings();
    }


    private updateSettings() {
        var settings = vscode.workspace.getConfiguration("insertnumbers");
        if (!settings) {
            return;
        }

        //TODO: format check.
        this.formatStr = settings.get<string>("formatstr");
        if (!this.formatStr) {
            this.formatStr = ":d";
        }

        this.start = settings.get<number>("start");
        if (!this.start) {
            this.start = 0;
        }

        this.step = settings.get<number>("step");
        if (!this.step) {
            this.step = 1;
        }

        this.isChineseNumFormOne = settings.get<boolean>("isChineseNumFormOne");
        if (!this.isChineseNumFormOne) {
            this.isChineseNumFormOne = false;
        }

    }

    public dispose() {
        this._disposable.dispose();
    }
}

/**
 * NumInserter
 */
export class NumInserter {

    private _settings: InsertSettngs;

    constructor(settings: InsertSettngs) {
        this._settings = settings;
    }

    private insertNumbers(settings: IInsertSettngs) {
        let textEditor = vscode.window.activeTextEditor;

        const selections: vscode.Selection[] = textEditor.selections;

        const formatStr = settings.formatStr;
        const start = settings.start;
        const step = settings.step;

        let cur = start;

        textEditor.edit(function (builder) {
            let str: string, i: number
            let getStr: (formatStr: string, cur: number) => string
            if (/wk/i.test(formatStr)) {
                let wkArr: Array<string>
                switch (formatStr) {
                    case ':cn':
                        break
                    case ':CN':
                        break
                    case ':wkcn':
                        wkArr = cstr.wkCn
                        break
                    case ':WKCN':
                        wkArr = cstr.wkCN
                        break
                    case ':wken':
                        wkArr = cstr.wkEn
                        break
                    case ':WKEN':
                        wkArr = cstr.wkEN
                        break
                    default:
                        throw new SyntaxError('[sprintf] failed to parse format.')
                }
                getStr = (formatStr, cur) => wkArr[cur % 7]
            } else if (/cn/i.test(formatStr)) {
                getStr = numToChinanumerals
            } else {
                getStr = (formatStr, cur) => FString.format(formatStr, cur)
            }

            for (i = 0; i < selections.length; i++) {
                str = getStr(formatStr, cur)
                cur += step
                builder.replace(selections[i], str)
            }
        }
        )
    }

    private parseUserInput(input: string): IInsertSettngs {
        if (!input) {
            return;
        }

        let retSettings: IInsertSettngs = {
            formatStr: ":d",
            start: 0,
            step: 1,
            isChineseNumFormOne: false
        };

        //A simple check. :)
        if (!/^:{1}/.test(input)) {
            vscode.window.showErrorMessage("Wrong format string.");
            return;
        }

        // eg... ":d:1:2"
        if (input.includes(":")) {

            let paramList = input.split(":", 4);

            retSettings.formatStr = ':' + paramList[1];
            const strStart = paramList[2] || '0';
            const strStep = paramList[3] || '1';
            if (/(?:wkcn)|(?:cn)/i.test(retSettings.formatStr) && retSettings.isChineseNumFormOne) {
                retSettings.start = 1
            } else {
                if (strStart.includes(".")) {
                    retSettings.start = parseFloat(strStart);
                }
                else {
                    retSettings.start = parseInt(strStart);
                }

                if (strStep.includes(".")) {
                    retSettings.step = parseFloat(strStep);
                }
                else {
                    retSettings.step = parseInt(strStep);
                }
            }
        }
        //eg... "%d"
        return retSettings;
    }

    public processInsert() {
        //Input default numbers first.
        this.insertNumbers(this._settings);


        const opt: vscode.InputBoxOptions = {
            placeHolder: "(default) :d:0:1",
            prompt: "Input :format or :format:start:step"
        }
        const input = vscode.window.showInputBox(opt);

        if (!input) {
            return;
        }

        let parseUserInput = this.parseUserInput;
        let insertNumbers = this.insertNumbers;

        let newSettings = null;

        input.then(function (val: string) {

            newSettings = parseUserInput(val);

            if (!newSettings) {
                return;
            }
            insertNumbers(newSettings);
        })

    }


    public dispose() {
        this._settings.dispose();
    }
}