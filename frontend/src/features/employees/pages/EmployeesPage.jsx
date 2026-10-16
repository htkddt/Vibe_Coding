import { useMemo, useState } from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/states/EmptyState.jsx';
import { members } from '../../../mocks/members.js';
import { EmployeeGrid } from '../components/EmployeeGrid.jsx';
import { MemberSearch } from '../components/MemberSearch.jsx';

export function EmployeesPage() {
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const filteredMembers = useMemo(() => members.filter((member) => (member.name + member.role + member.team).toLowerCase().includes(query.toLowerCase())), [query]);
  return <section className="employees-page"><div className="employees-toolbar"><MemberSearch value={query} onChange={setQuery} /><Button icon="plus" className="button--primary" onClick={() => setNotice('Member creation is ready to connect when the API contract is available.')}>Add member</Button></div>{notice ? <p className="inline-notice" role="status">{notice}</p> : null}{filteredMembers.length ? <EmployeeGrid members={filteredMembers} /> : <EmptyState title="No members found" message="Try another name, role, or team." />}</section>;
}
