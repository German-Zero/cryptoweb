<script setup lang="ts">
import type { User } from '@/types/user'
import type { WalletItem } from '@/types/wallet'

defineProps<{
  user: User | null
  wallet: WalletItem[]
  arsBalance: number
}>()

const emit = defineEmits(['open-exchange'])
</script>

<template>
  <div
    class="bg-[#12121a] p-6 rounded-2xl border border-gray-800 flex justify-between items-center"
  >
    <div v-if="user">
      <h1 class="text-xl font-semibold tracking-wide">
        {{ user.username }}
      </h1>

      <p class="text-sm text-gray-400 mt-1">ID: {{ user.id }}</p>

      <div class="mt-4">
        <p class="text-xs text-gray-400 uppercase tracking-wider">Balance</p>
        <p class="text-2xl font-bold text-violet-400">${{ arsBalance }}</p>
      </div>
    </div>

    <div class="flex flex-col items-end space-y-2">
      <div class="space-y-1 text-sm">
        <div
          v-for="crypto in wallet"
          :key="crypto.cryptoCode"
          class="flex justify-between gap-6 text-gray-300"
        >
          <span>{{ crypto.cryptoCode }}</span>
          <span class="font-medium">{{ crypto.amount }}</span>
        </div>
      </div>

      <button
        @click="emit('open-exchange')"
        class="mt-3 bg-violet-600 hover:bg-violet-700 text-sm px-4 py-2 rounded-xl transition"
      >
        Cambiar criptomonedas
      </button>
    </div>
  </div>
</template>
