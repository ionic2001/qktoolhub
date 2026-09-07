export function focusWindow(date: string, start: string, end: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(start) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(end) || start === end) throw new Error('invalid');
  const [y,m,d]=date.split('-').map(Number), [sh,sm]=start.split(':').map(Number), [eh,em]=end.split(':').map(Number);
  const from=new Date(y,m-1,d,sh,sm), to=new Date(y,m-1,d,eh,em);
  if(end<start)to.setDate(to.getDate()+1);
  if(!Number.isFinite(from.getTime())||from.getFullYear()!==y||from.getMonth()!==m-1||from.getDate()!==d||from.getHours()!==sh||from.getMinutes()!==sm||to.getHours()!==eh||to.getMinutes()!==em)throw new Error('invalid');
  return {start:from.getTime(),end:to.getTime(),done:false};
}
export function localDateInput(at: number) { const d=new Date(at);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
