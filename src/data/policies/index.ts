import type { Policy } from '../types'
import { POLICY_2026_08_18 } from './v2026-08-18'
import { POLICY_2023_09_21 } from './v2023-09-21'

/**
 * 방침 목록. **맨 앞이 현행 방침이고, 뒤로 갈수록 오래된 것이다.**
 * 화면은 처음 열릴 때 언제나 목록의 첫 번째(현행)를 보여준다.
 *
 * 방침을 새로 개정하면
 * 1) `v{시행일}.ts` 파일을 새로 만들고
 * 2) 직전 방침의 `status` 를 'past' 로, `effectiveTo` 와 `notice` 를 채운 뒤
 * 3) 이 배열 맨 앞에 새 방침을 끼워 넣는다.
 */
export const POLICIES: Policy[] = [POLICY_2026_08_18, POLICY_2023_09_21]

/** 현재 시행 중인 방침 */
export const CURRENT_POLICY: Policy =
  POLICIES.find((policy) => policy.status === 'current') ?? POLICIES[0]
