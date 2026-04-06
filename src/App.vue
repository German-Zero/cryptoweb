<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'

import UserCard from '@/components/UserCard.vue'
import TransactionTable from '@/components/TransactionTable.vue'
import PriceSidebar from '@/components/PriceSidebar.vue'
import ExchangeModal from '@/components/modals/ExchangeModal.vue'

import type { User } from '@/types/user'
import type { WalletItem } from '@/types/wallet'
import type { Transaction } from '@/types/transaction'

const showExchange = ref(false)
const user = ref<User | null>(null)
const wallet = ref<WalletItem[]>([])
const transactions = ref<Transaction[]>([])
const arsBalance = ref(0)

const fetchData = async () => {
  const userId = 1

  const u = await api.get(`/users/${userId}`)
  user.value = u.data

  const ars = await api.get(`/wallet/${userId}/total-ars`)
  arsBalance.value = ars.data

  const w = await api.get(`/wallet/${userId}`)
  wallet.value = w.data

  const tx = await api.get(`/transactions/user/${userId}`)
  transactions.value = tx.data
}

onMounted(fetchData)
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0f] text-white flex">
    <main class="flex-1 p-8 space-y-8">
      <section>
        <UserCard
          :user="user"
          :wallet="wallet"
          :arsBalance="arsBalance"
          @open-exchange="showExchange = true"
        />
      </section>

      <section>
        <TransactionTable :transactions="transactions" @refresh="fetchData" />
      </section>
    </main>

    <aside>
      <PriceSidebar />
    </aside>

    <ExchangeModal
      v-if="showExchange && user"
      :userId="user.id"
      @close="showExchange = false"
      @refresh="fetchData"
    />
  </div>
</template>
