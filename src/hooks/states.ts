import { useState } from "react";

export const useDays = () => {
const [mon, setMon] = useState<string>('');
const [tue, setTue] = useState<string>('');
const [wed, setWed] = useState<string>('');
const [thu, setThu] = useState<string>('');
const [fri, setFri] = useState<string>('');
const [sat, setSat] = useState<string>('');
const [sun, setSun] = useState<string>('');

return {mon, setMon, tue, setTue, wed, setWed, thu, setThu, fri, setFri, sat, setSat, sun, setSun }
}
export const useCustom = () => {
const [monday, setMonday] = useState<boolean>(false);
const [tueday, setTueday] = useState<boolean>(false);
const [wednesday, setWednesday] = useState<boolean>(false);
const [thuday, setThuday] = useState<boolean>(false);
const [friday, setFriday] = useState<boolean>(false);
const [satday, setSatday] = useState<boolean>(false);
const [sunday, setSunday] = useState<boolean>(false);

return {monday, setMonday, tueday, setTueday, wednesday, setWednesday, thuday, setThuday, friday, setFriday, satday, setSatday, sunday, setSunday }
}