import { useState } from 'react';
import { Icon } from '../ui/Icon.jsx';

export function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState('');
  function submit(event) {
    event.preventDefault();
    if (!question.trim()) return;
    setReply('I can guide you step by step. Try opening Posts to share a team update.');
    setQuestion('');
  }
  return (
    <aside className="assistant" aria-label="179 Assist">
      {open ? <section className="assistant-panel"><header><span className="assistant-panel__title"><Icon name="sparkle" size={21} /><span><strong>179 Assist</strong><small>Online · Replies instantly</small></span></span><button aria-label="Close assistant" onClick={() => setOpen(false)}><Icon name="close" size={16} /></button></header><div className="assistant-panel__messages"><p>Hi Kiet! What do you need help with?</p><strong>How do I publish a post?</strong><p>I can guide you step by step.</p>{reply ? <p className="assistant-panel__reply">{reply}</p> : null}</div><form onSubmit={submit}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about the portal..." aria-label="Ask 179 Assist" /><button aria-label="Send question" type="submit"><Icon name="send" size={16} /></button></form></section> : null}
      <div className="assistant-launcher"><button className="assistant-launcher__label" onClick={() => setOpen(true)}>Ask 179 Assist</button><button className="assistant-launcher__orb" aria-label="Open 179 Assist" onClick={() => setOpen(true)}><Icon name="sparkle" size={25} /></button></div>
    </aside>
  );
}
